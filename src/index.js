import React from 'react';
import ReactDOM from 'react-dom';
import { parser, queryBuilder, http } from 'olasearch-solr-adapter';
import SearchContainer from './containers/Search';
import config from './config.movies';
import { compose, combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import {
    Search,
    AutoSuggest,
    Guide,
    OlaProvider,
    Actions,
    InstantSearch,    
    olaReducer,
    createOlaMiddleWare,
} from 'olasearch'

var _root = document.getElementById('root'),
    _guide = document.getElementById('guide'),
    _autosuggest = document.getElementById('autosuggest');


const __DEV__ = process.NODE_ENV == 'production'? false : true;

const disabledActions = ['UPDATE_QUERY_TERM', 'REQUEST_SEARCH', 'CLEAR_QUERY_TERM', 'ADD_HISTORY', 'UPDATE_QUERY_TERM_AUTOSUGGEST', 'REQUEST_AUTOSUGGEST'];

/* Options that should be passed to OlaProvider */

let options = {
    config, 
    parser: new parser( config ), 
    queryBuilder: new queryBuilder( config ),
    searchService: new http( config )
};

const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => __DEV__ && disabledActions.indexOf(action.type) == -1
});

/* Create store */

let reducers = combineReducers( Object.assign({}, olaReducer));

let olaMiddleWare = createOlaMiddleWare(options)

let store = compose(
            applyMiddleware(thunk, olaMiddleWare, logger),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )(createStore)( reducers )

if(process.env.NODE_ENV === 'production'){
    store =  applyMiddleware(thunk, olaMiddleWare)(createStore)(reducers)
}

if(_root){
    ReactDOM.render(
        <OlaProvider { ...options } store = { store } >
            <Search />
        </OlaProvider>
        , _root
    );
}

if(_guide){
    ReactDOM.render(
        <OlaProvider { ...options } store = { store }>            
            <Guide name="banner" />           
        </OlaProvider>
        , _guide
    );
}

if(_autosuggest){
    ReactDOM.render(
        <OlaProvider { ...options } store = { store }>            
            <AutoSuggest />         
        </OlaProvider>
        , _autosuggest
    );
}