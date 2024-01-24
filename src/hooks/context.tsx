import { actionType, alertState } from 'config/state'
import { alertReducer } from 'helpers/dataReducer'
import React, { useContext, useReducer, useState } from 'react'
import Reducer from 'utils/reducer'

interface AppContextInterface {
  alert: any
  openAlert: (e: any) => void
  closeAlert: (e: any) => void
  levelMitra: string
  setLevelMitra: (e: any) => void
  watcherID: string
  setWatcherID: (e: string) => void
  isModalLocationShow: boolean
  closeModalLocation: () => void
  openModalLocation: () => void
}

export const AppContext = React.createContext<AppContextInterface>({
  alert: null,
  openAlert: (e: any) => {},
  closeAlert: (e: any) => {},
  levelMitra: '',
  setLevelMitra: (e: any) => {},
  watcherID: '',
  setWatcherID: (e: string) => {},
  isModalLocationShow: false,
  closeModalLocation: () => {},
  openModalLocation: () => {},
})

export const AppProvider: React.FC = ({ children }) => {
  const [alert, dispatchAlert] = useReducer(alertReducer, alertState)
  const [levelMitra, setLevelMitra] = useState<string>('')
  const [watcherID, setWatcherID] = useState<string>('')
  const [isModalLocationShow, setModalLocationShow] = useState(false)

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

  const closeModalLocation = () => {
    setModalLocationShow(false)
  }

  const openModalLocation = () => {
    setModalLocationShow(true)
  }

  return (
    <AppContext.Provider
      value={{
        alert,
        openAlert,
        closeAlert,
        levelMitra,
        setLevelMitra,
        watcherID,
        setWatcherID,
        isModalLocationShow,
        closeModalLocation,
        openModalLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
