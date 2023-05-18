import {
  actionType,
  alertState,
} from 'config/state'
import {
  alertReducer,
} from 'helpers/dataReducer'
import React, { useContext, useReducer, useState } from 'react'
import Reducer from 'utils/reducer'

interface AppContextInterface {
  alert: any
  openAlert: (e: any) => void
  closeAlert: (e: any) => void

  productNamePrice: any
  setProductNamePrice: (e: any) => void

  wholesalerPrice: any
  setWholesalerPrice: (e: any) => void

  category: { id: number | undefined; e: string | undefined }
  setCategory: (e: any) => void
}

export const AppContext = React.createContext<AppContextInterface>({
  alert: null,
  openAlert: (e: any) => {},
  closeAlert: (e: any) => {},

  productNamePrice: null,
  setProductNamePrice: (e: any) => {},

  wholesalerPrice: null,
  setWholesalerPrice: (e: any) => {},

  category: { id: undefined, e: undefined },
  setCategory: (e: any) => {},
})

export const AppProvider: React.FC = ({ children }) => {
  const [alert, dispatchAlert] = useReducer(alertReducer, alertState)
  const [category, setCategory] = useState<any>({})
  const [productNamePrice, setProductNamePrice] = useState<any>({})
  const [wholesalerPrice, setWholesalerPrice] = useState<any>()

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
        category,
        productNamePrice,
        wholesalerPrice,
        setWholesalerPrice,
        setProductNamePrice,
        setCategory,
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
