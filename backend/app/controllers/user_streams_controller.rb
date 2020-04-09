class UserStreamsController < ApplicationController
  def index
    user_streams = UserStream.find(user_params[:user_id],stream_params[:stream_id])
    render json: game_turns
  end

  def create
    user_stream = UserStream.create(user_params[:user_id], stream_params[:stream_id])
    render json: game_turn
  end

  def destroy
  	user_stream = (user_params[:user_id],stream_params[:stream_id])
  	user_stream.destroy
  end

  private
  def streams_params
    params.require(:streams).permit(:stream_id)
  end

  def user_params
    params.permit(:user_id)
  end
end
