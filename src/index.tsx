import axios from 'axios'
import { AppProvider } from 'hooks/context'
import React from 'react'
import ReactDOM from 'react-dom'
import 'styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as setup from './setup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-day-picker/dist/style.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-circular-progressbar/dist/styles.css'

// public url
const { PUBLIC_URL } = process.env

// setting axios
setup.setupAxios(axios)

const clientQuery = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <QueryClientProvider client={clientQuery}>
        <App basename={PUBLIC_URL} />
      </QueryClientProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
