class UsersController < ApplicationController
  def index
  	users = User.all
  	render json: users
  end

  def create()
    user = User.find_or_create_by(username: user_params[:username],email: user_params[:email])
    render json: user
  end 
  
  private
  	def user_params
    	params.require(:user).permit(:id, :username, :email)
  	end   	
end
