Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :session
  resources :users do
    resources :goals, only: [:create, :index]
  end
  resources :goals, only: [:show, :delete]
end
