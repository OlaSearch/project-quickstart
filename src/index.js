import React from 'react'
import ReactDOM from 'react-dom'
import { Parser, QueryBuilder, Http } from 'olasearch-solr-adapter'
import SearchContainer from './containers/Search'
import config from 'olasearchconfig'
import thunk from 'redux-thunk'
import { createLoggerMiddleware } from 'olasearch-logger-middleware'
import { AutoSuggest, OlaProvider, createStore } from 'olasearch'

require('olasearch/src/style/core.scss')
require('./styles/main.scss')

config.showSuggestionHelp = true

var _root = document.getElementById('ola-serp')
var _autosuggest = document.getElementById('ola-autosuggest')

/* Optional loggerMiddleware */
let loggerMiddleware = createLoggerMiddleware({ logger: config.logger })
/* Store */
let store = createStore(config, { Parser, QueryBuilder, Http }, {}, [loggerMiddleware])

if(_root){
  ReactDOM.render(
    <OlaProvider config={config} store={store}>
      <SearchContainer />
    </OlaProvider>
    , _root
  )
}

if(_autosuggest){
  ReactDOM.render(
    <OlaProvider config={config} store={store}>
      <AutoComplete
        scrollOnFocus={false}
        forceRedirect
      />
    </OlaProvider>
    , _autosuggest
  )
}