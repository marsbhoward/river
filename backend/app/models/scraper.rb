require 'nokogiri'
require 'open-uri'
require 'net/http'
require 'json'

class Scraper < ApplicationRecord
	TMDB_BASE_URL = 'https://api.themoviedb.org/3'
	TOP_N = 20
	REFRESH_INTERVAL = 30.days

	# Gathers movie titles from every source configured on the stream (Collider
	# listicle scrape, TMDB discover API, or both), weighting a title by how
	# many sources agreed it belongs to this stream, and refreshes the top 20.
	# Intended to be called from a scheduled job (see lib/tasks/movies.rake),
	# not on-demand per request - see MoviesController#index, which just reads
	# whatever refresh_movies last persisted.
	def get_movies(stream)
		titles = []
		titles.concat(scrape_collider(stream)) if stream.url.present?
		titles.concat(scrape_tmdb(stream)) if stream.tmdb_provider_name.present?

		refresh_movies(stream, weigh_titles(titles))
	end

	private

	# Collider "best movies on X" listicles render each entry as an <h2> title
	# immediately followed by an <h3 id="rotten-tomatoes-..."> ratings line.
	# The <h2>'s own id slug is unreliable (Collider encodes apostrophes
	# differently across articles - "lsquo-...-rsquo-" on some, "39-...-39-"
	# on others), so we anchor on the more consistent ratings <h3> instead.
	def scrape_collider(stream)
		doc = Nokogiri::HTML(URI.open(stream.url, "User-Agent" => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"))

		doc.css('h3[id^="rotten-tomatoes-"]').map do |ratings_heading|
			title_heading = ratings_heading.previous_element
			next unless title_heading&.name == 'h2'

			title = clean_collider_title(title_heading.text)
			title unless title.empty?
		end.compact
	rescue StandardError => e
		Rails.logger.error("Scraper#scrape_collider failed for stream #{stream.id} (#{stream.url}): #{e.class}: #{e.message}")
		[]
	end

	def clean_collider_title(raw_text)
		raw_text.strip
			.gsub(/[‘’']/, '')
			.sub(/\s*\(\d{4}\)\s*\z/, '')
			.strip
	end

	def scrape_tmdb(stream)
		api_key = Rails.application.credentials.tmdb_api_key
		return [] if api_key.nil? || api_key.empty?

		provider_id = tmdb_provider_id(stream.tmdb_provider_name, api_key)
		return [] unless provider_id

		uri = URI("#{TMDB_BASE_URL}/discover/movie")
		uri.query = URI.encode_www_form(
			api_key: api_key,
			watch_region: 'US',
			with_watch_providers: provider_id,
			sort_by: 'popularity.desc'
		)

		results = JSON.parse(Net::HTTP.get(uri))['results'] || []
		results.map { |movie| movie['title'] unless movie['title'].to_s.empty? }.compact
	rescue StandardError => e
		Rails.logger.error("Scraper#scrape_tmdb failed for stream #{stream.id} (#{stream.tmdb_provider_name}): #{e.class}: #{e.message}")
		[]
	end

	# Looks up TMDB's numeric provider_id by display name (e.g. "Starz", "Paramount Plus Essential")
	# instead of hardcoding ids, since TMDB/JustWatch provider ids aren't documented and can change.
	def tmdb_provider_id(provider_name, api_key)
		return nil if provider_name.nil? || provider_name.empty?

		uri = URI("#{TMDB_BASE_URL}/watch/providers/movie")
		uri.query = URI.encode_www_form(api_key: api_key, watch_region: 'US')
		providers = JSON.parse(Net::HTTP.get(uri))['results'] || []

		match = providers.find { |p| p['provider_name'].to_s.casecmp(provider_name).zero? }
		match && match['provider_id']
	end

	# Tallies titles by a normalized key so the same movie scraped from
	# different sources (which may format the title differently, e.g. Collider
	# strips apostrophes while TMDB doesn't) is recognized as one entry with
	# its weight incremented, rather than two separate entries.
	def weigh_titles(titles)
		tally = {}

		titles.each do |title|
			key = normalize_title(title)
			next if key.empty?

			tally[key] ||= { title: title, weight: 0 }
			tally[key][:title] = title
			tally[key][:weight] += 1
		end

		tally.values
	end

	def normalize_title(title)
		title.downcase.gsub(/[^a-z0-9 ]/, '').strip.gsub(/\s+/, ' ')
	end

	# Upserts this run's top-20 by weight first (so a movie already tracked
	# gets its refresh_date bumped instead of being torn down and recreated),
	# and only afterwards deletes movies that weren't refreshed within
	# REFRESH_INTERVAL - i.e. a movie survives a scrape that happens not to
	# rank it in the top 20 that particular run, and is only actually removed
	# once it's been absent long enough to be considered really gone.
	def refresh_movies(stream, weighted_titles)
		now = Time.current
		top_entries = weighted_titles.sort_by { |entry| -entry[:weight] }.first(TOP_N)
		existing_by_key = stream.movies.index_by { |movie| normalize_title(movie.title) }

		top_entries.each do |entry|
			key = normalize_title(entry[:title])
			movie = existing_by_key[key]

			if movie
				movie.update!(title: entry[:title], weight: entry[:weight], refresh_date: now)
			else
				stream.movies.create!(title: entry[:title], weight: entry[:weight], refresh_date: now)
			end
		end

		stream.movies.where('refresh_date < ?', REFRESH_INTERVAL.ago).destroy_all

		stream.movies.order(weight: :desc).limit(TOP_N)
	end
end
