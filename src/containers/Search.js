import React from 'react'
import { connect } from 'react-redux'
import ProgressBar from 'react-line-progress'
import classNames from 'classnames'
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
  TermSuggestion
} from 'olasearch'
import EscalationForm from 'olasearch/lib/components/EscalationForm'
import Answer from 'olasearch/lib/components/Answer'

class Search extends React.Component{
  constructor (props) {
    super (props)
    this.state = {
      isSidebarOpen: false
    }
  }
  toggleSidebar = () => {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    })
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
      isLoadingAnswer
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

    var { isSidebarOpen } = this.state
    let modalKlass = classNames('ola-modal-background', {
      'ola-modal-show': isSidebarOpen,
      'ola-modal-hide': !isSidebarOpen
    })
    let resultsKlass = classNames('ola-results-flex', {
      'ola-sidebar-open': isSidebarOpen
    })
    let hasAnswer = !!(answer && answer.data && answer.suggestions.length)

    return (
      <div className='ola-container'>
        <div className={modalKlass}  onClick={this.toggleSidebar} />

        <div className={resultsKlass}>
          <div className="ola-sidebar">
            <SearchFilters
              facets = {facets}
              selected = {facet_query}
              dispatch = {dispatch}
            />
          </div>
          <div className="ola-results-container">
            <h1 className='page-title'>Search</h1>

            <AutoComplete
              q={q}
              categoryGroup='sm_field_subjectsdollarname'
              searchOnSelect
              onSelect={(suggestion) => {
                if (suggestion.type === 'entity' && !suggestion.taxo_term) {
                  /* Only for countries */
                  this.props.dispatch(Actions.Search.removeAllFacets())
                  this.props.dispatch(Actions.Search.updateQueryTerm(suggestion.term))
                }
              }}
            />

            <ProgressBar
              percent={isLoading || isLoadingAnswer ? 40 : 100}
              autoIncrement
              spinner={false}
            />

            <SelectedFilters
              facets = {facet_query}
              dispatch = {dispatch}
              referrer = {referrer}
              grouped={false}
            />

            <button className='ola-link-open-filter' onClick={this.toggleSidebar} />

            <SearchTitle
              totalResults={totalResults}
              page={page}
              perPage={per_page}
            />

            {!hasAnswer
              ? <TermSuggestion
                  term={suggestedTerm}
                  q={q}
                />
              : null
            }

            <SpellSuggestion
              suggestions={spellSuggestions}
              totalResults={totalResults}
              dispatch={dispatch}
            />

            <Answer
              answer={answer}
              isLoading={isLoadingAnswer}
            />

            <SearchResults
              results={this.props.AppState.results}
              bookmarks={this.props.AppState.bookmarks}
              dispatch={this.props.dispatch}
            />

            <NoResults
              q={q}
              isLoading={isLoading}
              results={this.props.AppState.results}
            />

            <EscalationForm
              visible={!isLoading && !results.length && q}
              onSubmit={(event) => event.preventDefault()}
            >
              <a href='https://www.adb.org/contact'>
                <abbr className="ico ico-envelope-o" title="Email" /> Send us a message
              </a>
            </EscalationForm>

            <SearchFooter
              totalResults={totalResults}
              currentPage={page}
              perPage={per_page}
              dispatch={dispatch}
              isPhone={isPhone}
            />
          </div>

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

export default connect(mapStateToProps)(Decorators.OlaRoute(Search))
