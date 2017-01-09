import React from 'react';
import { Fields, SnippetActions } from 'olasearch';

export default class Snippet extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let { result, showSummary, isAutocomplete } = this.props;
    return (
      <div className="ola-snippet">
        <Fields.Title result = {result} />

        <div className="ola-snippet-actions">
          <SnippetActions.Bookmark { ...this.props } />
        </div>

        {showSummary? <Fields.Summary result = { result } /> : null}
      </div>
    )

  }
}

Snippet.defaultProps = {
  showSummary: true
}
