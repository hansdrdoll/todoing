Rails.application.routes.draw do
  devise_for :users
  resources :todos, only: [:index, :show], path: "/api/todos"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
