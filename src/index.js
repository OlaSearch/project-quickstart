import React from 'react'
import ReactDOM from 'react-dom'
import { Parser, QueryBuilder, Http } from '@olasearch/solr-adapter'
import Search from '@olasearch/core/lib/containers/Search'
import { AutoComplete, OlaProvider, createStore, Actions } from '@olasearch/core'
import { ChatReducer, BotFrame, persistMiddleware, notificationMiddleware, translations as chatTranslations } from '@olasearch/chat'
import { createLoggerMiddleware } from '@olasearch/logger'
import config from 'olasearchconfig'

/* Include any css  */
require('@olasearch/core/style/core.scss')
require('@olasearch/chat/style/chat.scss')

const ola_serp = document.getElementById('ola-serp')
const ola_autosuggest = document.getElementById('ola-autosuggest')
const ola_chatbot = document.getElementById('ola-chatbot')

/* Optional loggerMiddleware */
let loggerMiddleware = createLoggerMiddleware({ logger: config.logger })

/* Chat persist middleware */
let chatPersistMiddleware = persistMiddleware({ namespace: config.namespace })

/* Push notification middleware */
let chatNotification = notificationMiddleware({ name: config.projectName, icon: config.botAvatar })

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
    <OlaProvider config={config} store={store} translations={chatTranslations}>
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
      />
    </OlaProvider>
    , ola_chatbot
  )
}