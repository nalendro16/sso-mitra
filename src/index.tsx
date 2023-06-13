import axios from 'axios'
import { AppProvider } from 'hooks/context'
import React from 'react'
import ReactDOM from 'react-dom'
import 'styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as setup from './setup'
import 'react-day-picker/dist/style.css'
import 'react-loading-skeleton/dist/skeleton.css'

// public url
const { PUBLIC_URL } = process.env

// setting axios
setup.setupAxios(axios)

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App basename={PUBLIC_URL} />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
