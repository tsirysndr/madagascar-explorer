import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import Region from './components/Region'
import District from './components/District'
import Commune from './components/Commune'
import Fokontany from './components/Fokontany'
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { HashRouter, Route } from 'react-router-dom'

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter hashType='hashbang'>
      <Route path='/' exact component={App} />
      <Route path='/regions/:id' exact component={Region} />
      <Route path='/districts/:id' exact component={District} />
      <Route path='/communes/:id' exact component={Commune} />
      <Route path='/fokontany/:id' exact component={Fokontany} />
    </HashRouter>
  </ApolloProvider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
