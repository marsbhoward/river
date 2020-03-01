require 'nokogiri'
require 'open-uri'

class Scraper < ApplicationRecord
	def get_movies(stream)
		current_stream = Stream.find_by(name:stream.name)
		movie_collection = []
		movie_data = []

		if (current_stream.id > 6 )
			movies =  Nokogiri::HTML(open(current_stream.url)).css('a')

			list = []
    		index = 0
     		movies =Nokogiri::HTML(open(current_stream.url)).css('a')


     		#iterates through all of the img tags and selects those that contain class value
     		movies.to_a.each { |element| 
	     		if (element.to_s.include? '"css-1rashen e126mwsw1"')
	      			element = element.to_a
	      			if index > 14 and index < 40
		        		element = element[0][1]
		        		element = element.to_s.sub("/movie/","")
		        		current_stream.movies.new(title: element[0...-5])
		        		movie_collection.push(element[0...-5]) 
	      			elsif (index >40)
	        		else
		         		element = element[0]
		         		element = element[1]
		         		element = element.to_s.sub("/movie/","")
		         		current_stream.movies.new(title: element[0...-5])
		         		movie_collection.push(element[0...-5]) 
	      			end
					index = index + 1
    			end
      		}
			return movie_collection
		else
			movies = Nokogiri::HTML(open(current_stream.url)).css(".slide")
		
			movies.each do |post|
				movie_data.push (post.first)
			end

			movie_data.each do |movie|
				movie_title = movie[1] 
				if movie_title.include? 'more-recommendations'
				else
					current_stream.movies.new(title: movie_title)
					movie_collection.push (movie_title)
				end
			end
			return movie_collection
		end
	end
end