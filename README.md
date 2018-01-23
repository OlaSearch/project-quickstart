# OlaSearch Boilerplate

````
git clone
npm install
npm start
````

## Setup instructions

1. Clone this repo and do npm install

````
git clone git@gitlab.com:olasearch/olasearch-project-starter.git olasearch-project-starter
cd olasearch-project-starter
yarn install
````

2. Clone the following repositories in the same directory level as `olasearch-project-starter`

````
git clone git@gitlab.com:olasearch/olasearch-core.git npm-olasearch
cd npm-olasearch
yarn install

git clone git@gitlab.com:olasearch/olachat.git olachat
cd olachat
yarn install
````

Directory structure

````
olasearch-project-starter
  --
npm-olasearch
  --
olachat
  --
````

3. cd to `olasearch-project-starter`

````
yarn start
````

If you see any errors, make sure

1. Aliases in webpack.config.dev are pointing to the right folder
2. Check if any npm modules needs to be installed.