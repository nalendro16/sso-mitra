import { actionType, alertState } from 'config/state'
import { alertReducer } from 'helpers/dataReducer'
import React, { useContext, useReducer } from 'react'
import Reducer from 'utils/reducer'

interface AppContextInterface {
  alert: any
  openAlert: (e: any) => void
  closeAlert: (e: any) => void
}

export const AppContext = React.createContext<AppContextInterface>({
  alert: null,
  openAlert: (e: any) => {},
  closeAlert: (e: any) => {},
})

export const AppProvider: React.FC = ({ children }) => {
  const [alert, dispatchAlert] = useReducer(alertReducer, alertState)

  const openAlert = (action: any) => {
    return new Reducer(alert, dispatchAlert).dispatch({
      ...action,
      type: actionType.OPEN,
    })
  }

  const closeAlert = (a: any) => {
    if (typeof alert.callback === 'function') {
      alert.callback({ isConfirm: a.isConfirm })
    }
    dispatchAlert({ type: actionType.CLOSE })
  }
  return (
    <AppContext.Provider
      value={{
        alert,
        openAlert,
        closeAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
