import React from 'react'
import ReactDOM from 'react-dom'
import { Parser, QueryBuilder, Http } from '@olasearch/solr-adapter'
import Search from './containers/Search'
import config from 'olasearchconfig'
import thunk from 'redux-thunk'
import { createLoggerMiddleware } from '@olasearch/logger'
import { AutoComplete, OlaProvider, createStore } from '@olasearch/core'
import { ChatReducer, BotFrame, Bot, ChatActions } from '@olasearch/chat'

require('@olasearch/core/src/style/core.scss')
require('@olasearch/chat/style/chat.scss')

const ola_serp = document.getElementById('ola-serp')
const ola_autosuggest = document.getElementById('ola-autosuggest')
const ola_chatbot = document.getElementById('ola-chatbot')
const css_url = !process.env.OLA_ENV || process.env.OLA_ENV === 'staging' ? '/olachat.min.css' : `https://cdn.olasearch.com/assets/css/olasearch.core.min.css`


// config.proxy = config.intentEngineEnabled = false
// config.ajaxOptions.method = 'GET'

/* Optional loggerMiddleware */
let loggerMiddleware = createLoggerMiddleware({ logger: config.logger })

/* Store */
let store = createStore(config, { Parser, QueryBuilder, Http }, { Conversation: ChatReducer }, [loggerMiddleware])

// Dummy: remove after testing
store.dispatch(ChatActions.setBotStatus(true))

if(ola_serp){
  ReactDOM.render(
    <OlaProvider config={config} store={store}>
      <Search />
    </OlaProvider>
    , ola_serp
  )
}

if(ola_autosuggest){
  ReactDOM.render(
    <OlaProvider config={config} store={store}>
      <AutoComplete
        scrollOnFocus={false}
        forceRedirect
      />
    </OlaProvider>
    , ola_autosuggest
  )
}

if (ola_chatbot) {
  ReactDOM.render(
    <OlaProvider config={config} store={store} className='ola-chatbot'>
      <Bot
        initialIntent={config.initialIntent}
        headerProps={{
          title: config.chatbotTitle
        }}
        avatarProps={{
          avatarBot: config.botAvatar,
          avatarUser: config.userAvatar,
        }}
        bubbleProps={{
          label: config.chatbotBubbleLabel
        }}
        botProps={{
          botName: config.botName,
          userName: 'You'
        }}
        head={
          <div>
            <link rel='stylesheet' href={css_url} />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
          </div>
        }
      />
    </OlaProvider>
    , ola_chatbot
  )
}