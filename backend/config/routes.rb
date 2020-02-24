Rails.application.routes.draw do
  resources :scrapers
  resources :user_streams
  resources :movies
  resources :streams
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
