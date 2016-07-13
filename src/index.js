import React from 'react';
import ReactDOM from 'react-dom';
import { Parser, QueryBuilder, Http } from 'olasearch-solr-adapter';
import SearchContainer from './containers/Search';
import config from './config.movies';
import { compose, combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLoggerMiddleware, loggerService } from 'olasearch-logger-middleware';

import {
    Search,
    AutoSuggest,
    OlaProvider,
    Actions,
    InstantSearch,
    olaReducer,
    createOlaMiddleware,
} from 'olasearch'

var _root = document.getElementById('root'),
    _guide = document.getElementById('guide'),
    _autosuggest = document.getElementById('autosuggest');


const __DEV__ = process.NODE_ENV == 'production'? false : true;

const disabledActions = ['UPDATE_QUERY_TERM', 'REQUEST_SEARCH', 'CLEAR_QUERY_TERM', 'ADD_HISTORY', 'UPDATE_QUERY_TERM_AUTOSUGGEST', 'REQUEST_AUTOSUGGEST'];

/* Options that should be passed to OlaProvider */

let options = {
    config,
    parser: new Parser( config ),
    queryBuilder: new QueryBuilder( config ),
    searchService: new Http( config )
}

/* Create store */

let reducers = combineReducers( Object.assign({}, olaReducer));
let olaMiddleWare = createOlaMiddleware(options)
let loggerMiddleWare = createLoggerMiddleware(options)
let store

if(process.env.NODE_ENV === 'production'){
    store =  applyMiddleware(thunk, olaMiddleWare, loggerMiddleWare)
} else {
    var createLogger = require('redux-logger')
    const logger = createLogger({
        collapsed: true,
        predicate: (getState, action) => __DEV__ //&& disabledActions.indexOf(action.type) == -1
    });
    store = compose(
        applyMiddleware(thunk, olaMiddleWare, loggerMiddleWare, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
}

let finalStore = store(createStore)(reducers)

if(_root){
    ReactDOM.render(
        <OlaProvider { ...options } store = { finalStore } >
            <Search />
        </OlaProvider>
        , _root
    );
}

if(_autosuggest){
    ReactDOM.render(
        <OlaProvider { ...options } store = { finalStore }>
            <AutoSuggest />
        </OlaProvider>
        , _autosuggest
    );
}