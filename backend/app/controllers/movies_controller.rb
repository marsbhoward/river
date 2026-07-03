class MoviesController < ApplicationController

	def index
		movies = Stream.find(params[:stream_id]).movies.order(weight: :desc).limit(20)
  		render json: movies.map(&:title)
	end

  	def movies_params
    	params.permit(:movie_id)
  	end

   	def stream_params
    	params.permit(:stream_imd,:name,:url)
  	end  
end
