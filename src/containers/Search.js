import React from 'react'
import { connect } from 'react-redux'
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
  FilterButton,
  Error,
  SearchBar,
  ContentWrapper,
  SearchContent,
  ProgressBar,
  AnswerToken,
  Answer,
} from '@olasearch/core';

// require('@olasearch/core/src/style/core.scss');

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
      answer,
      mc,
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

    return (
      <div>
        <SearchBar
          q={q}
          showAlert
          showHelp
          wordSuggestion
          refreshOnGeoChange
        />

        <SelectedFilters
          facets = {facet_query}
          dispatch = {dispatch}
          referrer = {referrer}
          grouped={false}
        />

        <AnswerToken
        />

        <ContentWrapper>          
          <Sidebar>
            <SearchFilters
              facets = {facets}
              selected = {facet_query}
              dispatch = {dispatch}
            />
          </Sidebar>

          <SearchContent>

            <Answer
              answer={answer}
              mc={mc}
              isLoading={isLoadingAnswer}
            />

            <ProgressBar />

            <FilterButton />

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

            <Error error={error} />

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
          </SearchContent>
        </ContentWrapper>

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