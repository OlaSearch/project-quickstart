# Ola Search Project starter for Search and Chatbots

This is a project starter to build customized Search and Chatbot experiences using Ola Search Platform. If you do not require cusotmization, you can download the `Embed code` from Ola Search

# Installation
````
git clone https://github.com/OlaSearch/project-quickstart.git
cd project-quickstart
npm install
npm start
````

## Prerequisites

Download the configurations from [https://admin.olasearch.com](https://admin.olasearch.com) . The configuration files contain settings for the project, filters, snippets, relevancy boosting etc.

1. Login to [https://admin.olasearch.com](https://admin.olasearch.com)
2. Navigate to Project -> Settings
3. Download the configuration files.
4. Save the file as `olasearch.config.js` in the `src` director

## Deploying to production

To deploy the code in production, you will need to compile and generate compressed JS/CSS files. To do that run

````
npm run production
````

Production Javascript/CSS files will be generated in `dist` folder.