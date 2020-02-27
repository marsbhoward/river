class MoviesController < ApplicationController

	def index
		movies = Scraper.new.get_movies(Stream.find(params[:stream_id]))
  		render json: movies
	end	

  	def create
    	movies = Scraper.new.netflix_movies
  		render json: movies
  	end


  	def movies_params
    	params.permit(:movie_id)
  	end

   	def stream_params
    	params.permit(:stream_id,:name,:url)
  	end  
end
