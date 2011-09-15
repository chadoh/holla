Holla2::Application.routes.draw do
  resources :messages
  resources :channels
  resources :assets
  resources :app

  match "/assets/*:id" => "assets#show"

  match "/authorize" => "authorize#index"
  ["google", "openid", "twitter", "yahoo"].each do |service|
    match "/auth/#{service}/callback" => "authorize#create"
  end

  match "/auth/failure" => "authorize#failure"
  match "/logout" => "authorize#destroy", :as => :logout

  root :to => "app#index"
end
