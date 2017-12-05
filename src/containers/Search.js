import React from 'react'
import { connect } from 'react-redux'
import ProgressBar from 'react-line-progress'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  Actions,
  AutoComplete,
  SearchResults,
  SearchFooter,
  SearchFilters,
  SelectedFilters,
  Decorators,
  SearchTitle,
  NoResults,
  SpellSuggestion,
  TermSuggestion,
  Sidebar,
  FilterButton
} from '@olasearch/core';

class Search extends React.Component{
  toggleSidebar = (event) => {
    event && event.preventDefault()
    return this.props.dispatch(Actions.Ui.toggleSidebar())
  };
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
      answer,
      isLoadingAnswer,
      isSidebarOpen
    } = AppState;

    var {
      q,
      facet_query,
      page,
      per_page,
      sort,
      referrer,
      isSearchActive,
    } = QueryState;

    var {
      isPhone,
      isTablet
    } = Device;

    let modalKlass = classNames('ola-modal-background', {
      'ola-modal-show': isSidebarOpen,
      'ola-modal-hide': !isSidebarOpen
    })

    let resultsKlass = classNames('ola-results-flex', {
      'ola-sidebar-open': isSidebarOpen
    })

    return (
      <div className='ola-container'>
        <div className={modalKlass} onClick={this.toggleSidebar} />
        <AutoComplete
          q={q}
        />

        <SelectedFilters
            facets = {facet_query}
            dispatch = {dispatch}
            referrer = {referrer}
            grouped={false}
        />

        <div className={resultsKlass}>
          
          <Sidebar>
            <SearchFilters
              facets = {facets}
              selected = {facet_query}
              dispatch = {dispatch}
            />
          </Sidebar>

          <div className="ola-results-container">
            <ProgressBar
              percent={isLoading || isLoadingAnswer ? 40 : 100}
              autoIncrement
              spinner={false}
            />

            <FilterButton
              facets={facets}
            />

            <SearchTitle
              totalResults={totalResults}
              page={page}
              perPage={per_page}
              isLoading={isLoading}
              isPhone={isPhone}
            />

            <TermSuggestion
              term={suggestedTerm}
              q={q}
              totalResults={totalResults}
              answer={answer}
            />

            <SpellSuggestion
              suggestions={spellSuggestions}
              totalResults={totalResults}
              dispatch={this.props.dispatch}
            />

            <SearchResults
              results = { this.props.AppState.results }
              bookmarks = { this.props.AppState.bookmarks }
              dispatch = {this.props.dispatch}
            />

            <NoResults
              q={q}
              isLoading={isLoading}
              suggestedTerm={suggestedTerm}
              facets={facet_query}
              totalResults={totalResults}
              dispatch={dispatch}
            />

            <SearchFooter
              totalResults = {totalResults}
              currentPage = {page}
              perPage = {per_page}
              dispatch = { dispatch }
              isPhone = { isPhone }
              isLoading={isLoading}
            />
          </div>

        </div>
      </div>
    )
  }
}

Search.contextTypes = {
  config: PropTypes.object
};

function mapStateToProps( state ){
  return {
    AppState: state.AppState,
    QueryState: state.QueryState,
    Device: state.Device
  }
}

export default connect( mapStateToProps ) ( Decorators.withRoute(Search) )