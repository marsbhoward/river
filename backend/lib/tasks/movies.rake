namespace :movies do
  desc "Refresh movie lists for streams not refreshed within Scraper::REFRESH_INTERVAL. " \
       "Intended to run daily via Heroku Scheduler; each stream is skipped unless it's " \
       "actually due, so the effective cadence per stream is REFRESH_INTERVAL (30 days)."
  task refresh: :environment do
    scraper = Scraper.new

    Stream.find_each do |stream|
      last_refresh = stream.movies.maximum(:refresh_date)

      if last_refresh && last_refresh > Scraper::REFRESH_INTERVAL.ago
        puts "Skipping #{stream.name} (id=#{stream.id}) - last refreshed #{last_refresh}"
        next
      end

      puts "Refreshing #{stream.name} (id=#{stream.id})..."
      movies = scraper.get_movies(stream)
      puts "  -> #{movies.size} movies"
    end
  end
end
