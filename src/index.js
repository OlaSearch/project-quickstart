import React from 'react'
import ReactDOM from 'react-dom'
import { Parser, QueryBuilder, Http } from '@olasearch/solr-adapter'
import Search from './containers/SearchDemo'
import config from 'olasearchconfig'
import thunk from 'redux-thunk'
import { createLoggerMiddleware } from '@olasearch/logger'
import { AutoComplete, OlaProvider, createStore } from '@olasearch/core'
import { ChatReducer, BotFrame, Bot, ChatActions, persistMiddleware, notificationMiddleware } from '@olasearch/chat'


require('@olasearch/core/src/style/core.scss')
require('@olasearch/chat/style/chat.scss')

const ola_serp = document.getElementById('ola-serp')
const ola_autosuggest = document.getElementById('ola-autosuggest')
const ola_chatbot = document.getElementById('ola-chatbot')
const css_url = !process.env.OLA_ENV || process.env.OLA_ENV === 'staging' ? '/demo/olasearch.core.min.css' : `https://cdn.olasearch.com/assets/css/olasearch.core.min.css?version=${(new Date()).getTime()}`


// config.proxy = config.intentEngineEnabled = false
// config.ajaxOptions.method = 'POST'
config.projectName = 'Ola News Demo (Wordpress)'

/* Optional loggerMiddleware */
let loggerMiddleware = createLoggerMiddleware({ logger: config.logger })

/* Chat persist middleware */
let chatPersistMiddleware = persistMiddleware({ namespace: config.namespace })

let chatNotification = notificationMiddleware({ name: config.projectName })

/* Store */
let store = createStore(config,
  { Parser, QueryBuilder, Http }, /* Search Adapter */
  { Conversation: ChatReducer }, /* Chatbot Reducer */
  [ 
    chatPersistMiddleware, /* Chatbot Middlewares */
    chatNotification,
    loggerMiddleware /* Logging Middlewares */,
  ]
)

// Dummy: remove after testing
store.dispatch(ChatActions.setBotStatus(true))

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }

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
      <BotFrame
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