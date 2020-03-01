Rails.application.routes.draw do
  #devise_for :users
  resources :sessions, only: [:create, :destroy]
  resources :scrapers
  resources :user_streams
  resources :streams do
  	 resources :movies
  end
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
