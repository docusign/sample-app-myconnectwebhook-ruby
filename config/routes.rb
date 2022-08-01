# frozen_string_literal: true

only_json = ->(req) { req.format == :json }

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"

  resources :home, only: [] do
    collection do
      get :socket
    end
  end

  namespace :api do
    namespace :docusign do
      resources :auth, only: [], constraints: only_json do
        collection do
          # JWT Auth is API call returning JSON
          post :jwt_auth
        end
      end

      resources :bulk_send, only: [], constraints: only_json do
        collection do
          # send out Bulk Envelopes
          post :process_envelopes
        end
      end

      resources :trigger, only: [], constraints: only_json do
        collection do
          # process data from DS trigger
          post :do_process
        end
      end

      resources :clickwrap, only: [], constraints: only_json do
        collection do
          # init params for FE, to send out Clickwrap
          get :init_params
          # store data about sent Clickwrap
          post :store_data
        end
      end
    end
  end

  # Logout
  resources :session, only: [:index] do
    collection do
      delete :destroy
    end
  end

  ### OmniAuth Integration ###

  # Login starts with POST'ing to: /auth/docusign
  # /auth/docusign is an internal route created by OmniAuth and the docusign strategy from: /lib/docusign.rb
  # Should be POST, see: https://nvd.nist.gov/vuln/detail/CVE-2015-9284
  get "/auth/:provider/callback", to: "session#create"
  get "/auth/failure", to: "session#omniauth_failure"

  get "*path", to: "home#index"
end
