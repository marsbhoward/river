class UsersController < ApplicationController
  def index
  	users = User.all
  	render json: users
  end

  def create()
    user = User.create(username: user_params[:username],email: user_params[:email])
    render json: player
  end

  private
  	def user_params
    	params.require(:user).permit(:id, :username, :email)
  	end
end