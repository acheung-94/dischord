Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]
    resources :servers, only: [:index, :create, :show, :update, :destroy] do
      resources :channels, only: [:index] #TODO shorten as below
    end
    resources :channels, only: [:show, :create, :destroy, :update] do
      resources :messages, only: [:index]
    end
    resources :messages, except: [:edit, :new, :index]
    resources :memberships, only: [:create]
    delete '/memberships/:serverId', to: 'memberships#destroy'

    resources :friendships, only: [:index, :create, :update]
  end
  
end

#which channel resources are necessary to nest under servers? can all the rest be un-nested?
