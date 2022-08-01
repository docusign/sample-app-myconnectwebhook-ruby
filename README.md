# Ruby on Rails and React: MyConnect Sample Application

### Github repo: MyConnectSampleApp

## Introduction
MyConnect is a DocuSign sample application written in Ruby on Rails (server) and React (client). You can find a live instance running at [https://myconnect.sampleapps.docusign.com/](https://myconnect.sampleapps.docusign.com/).

MyConnect demonstrates the following:

1. **Authentication** with DocuSign via [JSON Web Token (JWT) Grant](https://developers.docusign.com/esign-rest-api/guides/authentication/oauth2-jsonwebtoken).
2. **Bulk Sending Multiple Envelopes:** ([Source](./app/services/e_sign/bulk_sending_envelopes_service.rb))  
   This example uses the DocuSign [eSignature REST API](https://developers.docusign.com/esign-rest-api) to [Bulk Send](https://developers.docusign.com/docs/esign-rest-api/reference/bulkenvelopes/bulksend/) multiple envelopes based on PDF document template, and filling data dynamically.
3. **Tracking User Signing Progress with Docusign Connect feature.** After the request has been sent to Docusign, the app awaits for webhook requests from [Docusign Connect](https://developers.docusign.com/platform/webhooks/connect/) and displays the result on UI.
4. **Signing Clickwrap Document:** ([Source](./app/javascript/src/pages/automatedWorkflow/index.js))  
   This example demonstates signing process of DocuSign [Clickwrap](https://developers.docusign.com/docs/click-api/how-to/create-clickwraps/) document.
5. **Sending out Confirmation Envelope after Successful Clickwrap Signature:** ([Source](./app/services/e_sign/send_envelope_service.rb))  
   This example uses the DocuSign [eSignature REST API](https://developers.docusign.com/esign-rest-api), demonstrating how to [crete an envelope](https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopes/create/). The example sends an envelope based on PDF template.  

## Installation

### Prerequisites

* A DocuSign developer account. Create a [free account](https://go.docusign.com/sandbox/productshot/?elqCampaignId=16535).
* A DocuSign integration key (a client ID) that is configured to use JSON Web Token (JWT) Grant.
  You will need the **integration key** itself and its **RSA key pair**. To use this application, you must add your application's **Redirect URI** to your integration key. This [**video**](https://www.youtube.com/watch?v=GgDqa7-L0yo) demonstrates how to create an integration key (client ID) for a user application like this example.
* [Ruby 3.1.2](https://www.ruby-lang.org/en/downloads/)
* [Node.js](https://nodejs.org/) v16+

### Required variables for `config/appsettings.yml`

* **app_url** - http://localhost:3000
* **integration_key** - Integration Key
* **integration_secret** - Integration Secret Key
* **jwt_integration_key** - this jwt_integration_key can have the same value as the above integration_key
* **impersonated_user_guid** - Your API account ID
* **signer_email** - Your API account Email
* **signer_name** - Your API account Name
* **authorization_server** - https://account-d.docusign.com for development env
* **aud** - `account-d.docusign.com` for development env
* **clickwrap_id** - Clickwrap ID

### Installation steps

**Manual**

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
Clone project into folder `./sample-app-my-connect-ruby`
```
git clone git@github.com:docusign/sample-app-my-connect-ruby.git
```
#### Run command to move project folder
```
cd sample-app-my-connect-ruby
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

#### Setup DocuSign Connect
```
https://admindemo.docusign.com/connect
```
In the `URL to Publish` field enter `https://{YOUR_NGROK_HOST}.ngrok.io/api/docusign/trigger/do_process.json`.

This will allow Connect to send request to your local environment. 

## Running MyConnect Sample App

### Manual

```
 bin/dev 
```
Open a browser to **http://localhost:3000**

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
NOTE: To deploy app to AWS LightSail, use docker-compose.aws.yml. Example:
```
docker compose -f docker-compose.aws.yml up
```
## License information
This repository uses the MIT License. See the [LICENSE](./LICENSE) file for more information.
