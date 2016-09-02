import React from 'react'
import ReactDOM from 'react-dom'
import { Parser, QueryBuilder, Http } from 'olasearch-solr-adapter'
import SearchContainer from './containers/Search'
import config from './config.movies'
import thunk from 'redux-thunk'
import { createLoggerMiddleware } from 'olasearch-logger-middleware'
import { AutoSuggest, OlaProvider, createStore } from 'olasearch'

var _root = document.getElementById('root'),
  _guide = document.getElementById('guide'),
  _autosuggest = document.getElementById('autosuggest')

/* Optional loggerMiddleware */
let loggerMiddleware = createLoggerMiddleware({ logger: config.logger })
/* Store */
let store = createStore(config, { Parser, QueryBuilder, Http }, {}, [loggerMiddleware])

if(_root){
  ReactDOM.render(
    <OlaProvider config={config} store={store} >
      <SearchContainer />
    </OlaProvider>
    , _root
  )
}

if(_autosuggest){
  ReactDOM.render(
    <OlaProvider config={config} store={store}>
      <AutoSuggest />
    </OlaProvider>
    , _autosuggest
  )
}