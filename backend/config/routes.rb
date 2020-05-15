Rails.application.routes.draw do
  resources :scrapers

  resources :streams do
  	 resources :movies
  end
  
  resources :users do
  	resources :user_streams
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
