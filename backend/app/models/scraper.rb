require 'nokogiri'
require 'open-uri'

class Scraper < ApplicationRecord
	def get_movies(stream)
		current_stream = Stream.find_by(name:stream.name)

		
		movies = Nokogiri::HTML(open(current_stream.url)).css(".slide")


		movie_collection = []
		movie_data = []

		movies.each do |post|
			movie_data.push (post.first)
		end

		movie_data.each do |movie|
			movie_title = movie[1] 
			current_stream.movies.new(title: movie_title)
			movie_collection.push (movie_title)
		end
		return movie_collection
	end
end