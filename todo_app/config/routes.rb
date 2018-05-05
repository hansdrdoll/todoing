Rails.application.routes.draw do
  # devise_for :users
  # get "/", to: static("index.html")

  # have a ton of api specific routes


  resources :todos, only: [:index, :show, :update], path: "/api/todos"
  get '*path', to: 'catchall#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
