import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
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
const loggerMiddleware = createLoggerMiddleware({ logger: config.logger })

/* Chat persist middleware */
const chatPersistMiddleware = persistMiddleware({ namespace: config.namespace })

/* Push notification middleware */
const chatNotification = notificationMiddleware({ name: config.projectName, icon: config.botAvatar })

/* Store */
const store = createStore(config,
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
    <Provider store={store}>
      <OlaProvider config={config}>
        <Search />
      </OlaProvider>
    </Provider>
    , ola_serp
  )
}

if(ola_autosuggest){
  ReactDOM.render(
    <Provider store={store}>
      <OlaProvider config={config}>
        <AutoComplete
          scrollOnFocus={false}
          forceRedirect
        />
      </OlaProvider>
    </Provider>
    , ola_autosuggest
  )
}

if (ola_chatbot) {
  ReactDOM.render(
    <Provider store={store}>
      <OlaProvider config={config} translations={chatTranslations}>
        <BotFrame
          voiceInput={config.chatBotVoice}
          inline={config.chatBotInline}
          initialIntent={config.initialIntent}
          startOver={config.chatBotStartOver}
          headerProps={{
            title: config.chatBotTitle
          }}
          avatarProps={{
            avatarBot: config.botAvatar,
            avatarUser: config.userAvatar,
          }}
          bubbleProps={{
            label: config.chatBotBubbleLabel
          }}
          botProps={{
            botName: config.botName,
            userName: 'You',
          }}
        />
      </OlaProvider>
    </Provider>
    , ola_chatbot
  )
}