require 'nokogiri'
require 'open-uri'
require 'net/http'
require 'json'

class Scraper < ApplicationRecord
	TMDB_BASE_URL = 'https://api.themoviedb.org/3'

	def get_movies(stream)
		if stream.provider == 'tmdb'
			scrape_tmdb(stream)
		else
			scrape_collider(stream)
		end
	end

	private

	# Collider "best movies on X" listicles render each entry as
	# <h2 id="lsquo-title-rsquo-year">&lsquo;Title&rsquo; (Year)</h2>
	def scrape_collider(stream)
		movie_collection = []
		doc = Nokogiri::HTML(URI.open(stream.url, "User-Agent" => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"))

		doc.css('h2[id^="lsquo-"]').each do |heading|
			title = clean_collider_title(heading.text)
			next if title.empty?

			stream.movies.new(title: title)
			movie_collection.push(title)
		end

		movie_collection
	end

	def clean_collider_title(raw_text)
		raw_text.strip
			.gsub(/[‘’']/, '')
			.sub(/\s*\(\d{4}\)\s*\z/, '')
			.strip
	end

	def scrape_tmdb(stream)
		api_key = ENV['TMDB_API_KEY']
		return [] if api_key.nil? || api_key.empty?

		provider_id = tmdb_provider_id(stream.tmdb_provider_name, api_key)
		return [] unless provider_id

		movie_collection = []
		uri = URI("#{TMDB_BASE_URL}/discover/movie")
		uri.query = URI.encode_www_form(
			api_key: api_key,
			watch_region: 'US',
			with_watch_providers: provider_id,
			sort_by: 'popularity.desc'
		)

		results = JSON.parse(Net::HTTP.get(uri))['results'] || []

		results.each do |movie|
			title = movie['title']
			next if title.nil? || title.empty?

			stream.movies.new(title: title)
			movie_collection.push(title)
		end

		movie_collection
	end

	# Looks up TMDB's numeric provider_id by display name (e.g. "Starz", "Paramount Plus")
	# instead of hardcoding ids, since TMDB/JustWatch provider ids aren't documented and can change.
	def tmdb_provider_id(provider_name, api_key)
		return nil if provider_name.nil? || provider_name.empty?

		uri = URI("#{TMDB_BASE_URL}/watch/providers/movie")
		uri.query = URI.encode_www_form(api_key: api_key, watch_region: 'US')
		providers = JSON.parse(Net::HTTP.get(uri))['results'] || []

		match = providers.find { |p| p['provider_name'].to_s.casecmp(provider_name).zero? }
		match && match['provider_id']
	end
end
