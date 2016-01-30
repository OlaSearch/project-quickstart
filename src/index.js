import React from 'react';
import ReactDOM from 'react-dom';
import { parser, queryBuilder, http } from 'olasearch-solr-adapter';
import SearchContainer from './containers/Search';
import config from './config.movies';

import {
    Search,
    AutoSuggest,
    Guide,
    OlaProvider,
    Actions,
    InstantSearch,
    createStore,
    olaState
} from 'olasearch'

var _root = document.getElementById('root'),
    _guide = document.getElementById('guide'),
    _autosuggest = document.getElementById('autosuggest');


/* Options that should be passed to OlaProvider */

let options = {
    config, 
    parser: new parser( config ), 
    queryBuilder: new queryBuilder( config ),
    searchService: new http( config ), 
    reducers: olaState
};

/* Create store */

let store = createStore ( options );

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