import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './App/store'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>, document.getElementById('root') as HTMLElement
)
