class Scraper < ApplicationRecord
	def get_movies(stream)
		current_stream = Stream.find_by(name:stream.name)

		
		movies = Nokogiri::HTML(open(current_stream.url)).css("title-list-grid__item")


		movie_collection = []
		movie_data = []

		movies.each do |post|
			movie_data.push (post)
		end


		return movie_collection
	end
end
