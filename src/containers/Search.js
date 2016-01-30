import React from 'react';
import { connect } from 'react-redux';
import OlaSearch from 'olasearch';

var {
    InstantSearch,    
    SearchResults,
    AutoSuggest,
    Actions,
    Pagination,
    SearchFooter,
    SearchFilters,
    Tabs,
    SelectedFilters,
    Decorators,
} = OlaSearch;

class Search extends React.Component{
 

    componentDidMount(){
        
        this.props.dispatch( Actions.Search.initSearch( { config: this.context.config }) )     

    }

    render(){

        var {
            dispatch,       
            AppState,
            QueryState,
            components,
            Device,
        } = this.props;
        
        var {
            results,
            facets,
            isLoading,
            suggestedTerm,
            spellSuggestions,
            bookmarks,
            totalResults,
            error,
        } = AppState;

        var {
            q,
            facet_query,
            page,
            per_page,
            sort,
            referrer,
        } = QueryState;

        var {
            isPhone,
            isTablet
        } = Device;

        return (
            <div>
                <AutoSuggest
                    dispatch = { this.props.dispatch }
                    searchUrl = '/?'
                    />

                <SelectedFilters 
                    facets = {facet_query} 
                    dispatch = {dispatch} 
                    referrer = {referrer}
                />

                <Tabs 
                    facets = {facets} 
                    dispatch = {dispatch}
                    selected = {facet_query}
                />

                <div className="ola-sidebar">
                    <SearchFilters 
                            facets = {facets} 
                            selected = {facet_query}
                            dispatch = {dispatch} />
                </div>

                <div className="ola-results-container">
                    <SearchResults 
                        results = { this.props.AppState.results } 
                        bookmarks = { this.props.AppState.bookmarks }
                        dispatch = {this.props.dispatch}
                        />
                    <SearchFooter
                        totalResults = {totalResults} 
                        currentPage = {page} 
                        perPage = {per_page} 
                        dispatch = { dispatch }
                        isPhone = { isPhone }
                        />
                </div>
            </div>
        )
    }
}

Search.contextTypes = {
    config: React.PropTypes.object
};

function mapStateToProps( state ){
    return {
        AppState: state.AppState,
        QueryState: state.QueryState,
        Device: state.Device       
    }
}

export default connect( mapStateToProps ) ( Decorators.OlaRoute.OlaRoute(Search) )