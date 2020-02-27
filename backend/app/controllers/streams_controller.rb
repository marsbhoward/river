class StreamsController < ApplicationController
  def index
  	streams = Stream.all
  	render json: streams
  end

  def new 
  	stream = Stream.find(stream_params[:id])
  end

  def create
  	stream = Stream.new()
  	render json: stream
  end


  def show
    stream = Stream.find(stream_params[:id])
    render json: stream
  end

  def stream_params
    params.permit(:id,:name)
  end  


end
