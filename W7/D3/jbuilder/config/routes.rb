Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :parties, only: [:show, :index]
    resources :guests, only: [:index]
    resources :guests, only: [:show] do
      resources :gifts, only: [:index]
    end
    resources :gifts, only: [:show]
  end

end
