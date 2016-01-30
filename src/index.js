import React from 'react';
import ReactDOM from 'react-dom';
import OlaSearch from 'olasearch';
import { parser, queryBuilder, http } from 'olasearch-elasticsearch-adapter';

import config from './config.elasticsearch';

var {
    Search,
    AutoSuggest,
    Guide,
    OlaProvider,
    Actions,
    InstantSearch
} = OlaSearch;


var _root = document.getElementById('root'),
    _guide = document.getElementById('guide'),
    _autosuggest = document.getElementById('autosuggest');


/* Options that should be passed to OlaProvider */

let options = {
    config, 
    parser: new parser( config ), 
    queryBuilder: new queryBuilder( config ),
    searchService: new http( config )
};


if(_root){
    ReactDOM.render(
        <OlaProvider { ...options }>
            <Search />
        </OlaProvider>
        , _root
    );
}