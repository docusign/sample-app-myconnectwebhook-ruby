# Ruby on Rails and React: MyConnectWebhook Sample Application

### Github repo: MyConnectWebhookSampleApp

## Introduction
MyConnectWebhook is a DocuSign sample application written in Ruby on Rails (server) and React (client). You can find a live instance running at [https://myconnectwebhook.sampleapps.docusign.com/](https://myconnectwebhook.sampleapps.docusign.com/).

MyConnectWebhook demonstrates the following:

1. **Authentication** with DocuSign via [JSON Web Token (JWT) Grant](https://developers.docusign.com/esign-rest-api/guides/authentication/oauth2-jsonwebtoken).
2. **Bulk sending multiple envelopes:** ([Source](./app/services/e_sign/bulk_sending_envelopes_service.rb))
   This example uses the DocuSign [eSignature REST API](https://developers.docusign.com/docs/esign-rest-api/) to [Bulk Send](https://developers.docusign.com/docs/esign-rest-api/reference/bulkenvelopes/bulksend/) multiple envelopes based on PDF document template, and filling data dynamically.
3. **Tracking user signing progress with the Docusign Connect webhook service.** After the request has been sent to Docusign, the app awaits for webhook requests from [Docusign Connect](https://developers.docusign.com/platform/webhooks/connect/) and displays the result on UI.
4. **Elastic signing:** ([Source](./app/javascript/src/pages/automatedWorkflow/index.js))
   This example demonstates signing process of a DocuSign [elastic template](https://developers.docusign.com/docs/click-api/how-to/create-elastic-templates/) document.
5. **Sending out a confirmation envelope after a successful elastic signature:** ([Source](./app/services/e_sign/send_envelope_service.rb))
   This example uses the DocuSign [eSignature REST API](https://developers.docusign.com/docs/esign-rest-api/), demonstrating how to [create an envelope](https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopes/create/). The example sends an envelope based on PDF template.

## Prerequisites

* A DocuSign developer account. Create a [free account](https://go.docusign.com/o/sandbox/).
* A DocuSign integration key (client ID) that is configured to use JSON Web Token (JWT) Grant.
  You will need the **integration key** itself and its **RSA key pair**. Copy your **RSA key pair** into a file in your config folder `config/docusign_private_key.txt`. You must also add your application's **Redirect URI** to your integration key. To run the app locally, this should be `http://localhost:3000/auth/docusign/callback`. This [**video**](https://www.youtube.com/watch?v=GgDqa7-L0yo) demonstrates how to create an integration key (client ID) for a user application like this example.
* [Ruby 3.1.2](https://www.ruby-lang.org/en/downloads/)
* [Node.js](https://nodejs.org/) v16+

### Required variables for `config/appsettings.yml`

* **app_url** - http://localhost:3000
* **jwt_integration_key** - this jwt_integration_key can have the same value as the above integration_key
* **impersonated_user_guid** - Your User ID
* **signer_email** - Your API account Email
* **signer_name** - Your API account Name
* **authorization_server** - https://account-d.docusign.com for the development environment
* **aud** - `account-d.docusign.com` for the development environment


## Setup your custom DocuSign Connect configuration

### Using a ruby script
The ruby script included with this project sets up a custom Connect configuration with the same settings that the hosted app uses at https://myconnectwebhook.sampleapps.docusign.com. You'll need to provide a name for your new custom connect configuration as well as the URL to publish which, if running locally using ngrok, should follow the format `https://{YOUR_NGROK_HOST}.ngrok.io/api/docusign/trigger/do_process.json`.

* Navigate to the root folder of the app
  ```
  cd sample-app-myconnectwebhook-ruby
  ```
* Run the ruby script `create_connect_configuration.rb`
  ```
  ruby create_connect_configuration.rb
  ```
* Provide the name and URL to publish for your connect configuration when prompted.
* Check https://admindemo.docusign.com/connect to view or edit your new custom Connect configuration!

### Using the DocuSign UI
* Visit https://admindemo.docusign.com/authenticate?goTo=connect
* Select "ADD CONFIGURATION" --> "Custom"
* Add a name for your custom Connect configuration
* In the `URL to Publish` field enter `https://{YOUR_NGROK_HOST}.ngrok.io/api/docusign/trigger/do_process.json`. This will allow Connect to send request to your local environment.
* subscribe to the events you wish your app to receive notifications for. Events for this app include

    Envelope and Recipients:

      Envelope Sent
      Envelope Delivered
      Recipient Auto Responded
      Recipient Signed/Completed
      Recipient Declined
      Recipient Finish Later


      Include Data:
        Custom Fields
        Recipients

    DocuSign Click:

      Click Agreed
      Click Declined


* Select "Enable Mutual TLS"
* "SAVE CONFIGURATION"

## Installation steps

**NOTE:** The first time you run the app with a new client id, you must grant consent for the application to perform actions on behalf of the user. Fill in your integration key and redirect url to the following consent url template and visit `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature+impersonation+click.manage+click.send&client_id=#{jwt_integration_key}&redirect_uri=#{redirect_uri}` to grant consent.

### Running app using docker compose
To build app:
```
docker compose build
```
To start app:
```
docker compose up
```

To prepare DB and run migrations, open new terminal and run:
```
docker compose exec web rake db:create db:migrate
```

To shutdown app - just stop the console with Ctrl+C. One should note docker containers will only be *stopped* if Ctrl+C is used. To stop environment and *remove* stopped containers, run:
```
docker compose down
```


### Running the app manually

#### Install RVM
```
https://rvm.io/rvm/install
```
#### Install appropriate version of ruby
```
rvm install ruby-3.1.2
rvm use 3.1.2
```
#### Install redis
On Linux
```
sudo apt update
sudo apt install redis-server
sudo service redis start
```
On Mac
```
brew install redis
brew services start redis
redis-server
```
#### Clone project
Clone project into folder `./sample-app-myconnectwebhook-ruby`
```
git clone git@github.com:docusign/sample-app-myconnectwebhook-ruby.git
```
#### Run command to move project folder
```
cd sample-app-myconnectwebhook-ruby
```
rvm recognize ruby version and create new gemset
#### Install bundler
```
gem install bundler
```
#### Install gems
```
bundle install
```
#### Create DB
```
bundle exec rake db:create
```
#### Migrate DB
```
bundle exec rake db:migrate
```
#### Install node modules
Use NVM https://github.com/nvm-sh/nvm and Node.js version 16+.
```
yarn install
```
#### Copy appsettings.yml
Copy `appsettings.yml` and fill it in with your settings taken from DocuSign Developer Account.
```
cp config/appsettings.example.yml config/appsettings.yml
```
#### Install Ngrok Tunnel (for local development)
```
https://ngrok.com/download
```
#### Run Ngrok Tunnel (for local development)
```
ngrok http 3000
```

#### Running MyConnectWebhook Sample App
```
 bin/dev
```
Open a browser to **http://localhost:3000**


## License information
This repository uses the MIT License. See the [LICENSE](./LICENSE) file for more information.
