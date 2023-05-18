import { request } from 'config/request'
import { actionType, initState } from 'config/state'
import { authorization } from 'helpers/auth'
import { requestReducer } from 'helpers/dataReducer'
import { useCallback, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { LocalStorage } from 'utils'

export const useRequest = (init = {}) => {
  const storage = new LocalStorage()
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(requestReducer, {
    ...initState,
    ...init,
  })

  const getRequest = useCallback((url: string, config = {}) => {
    authorization(config)

    const req = { ...config, url }

    dispatch({ type: actionType.LOADING })
    return request(req)
      .then((res: any) => {
        if (res.data.maintenance) {
          navigate('/maintenance', { state: res.data.data_maintenance })
          return
        }

        dispatch({ type: actionType.SUCCESS, data: res.data })
        return res
      })
      .catch((err: any) => {
        const { status, data } = err.response
        const errorMessage = data.message || err.message || 'unknown'

        if (status === actionType.UNAUTHORIZED) {
          storage.clear()
          navigate('/')
          window.location.reload()
        }

        if (status === actionType.INTERNAL_SERVER_ERROR) {
        }

        dispatch({ type: status || actionType.ERROR, error: errorMessage })
      })
  }, [])

  return [state, { getRequest }]
}

export const useGet = (init?: any) => {
  const [state, event] = useRequest(init)

  const getRequest = (url: string, params: any, config = {}) =>
    event.getRequest(url, { ...config, params, method: 'get' })

  return [state, { getRequest }]
}

export const usePost = (init?: any) => {
  const [state, event] = useRequest(init)

  const getRequest = (url: string, data = {}, config = {}) =>
    event.getRequest(url, { ...config, data, method: 'post' })

  return [state, { getRequest }]
}

export const usePut = (init?: any) => {
  const [state, event] = usePost(init)

  const getRequest = (url: string, data: any = {}, config = {}) => {
    data['_method'] = 'PUT'
    return event.getRequest(url, data, config)
  }

  return [state, { getRequest }]
}

export const usePatch = (init?: any) => {
  const [state, event] = usePost(init)

  const getRequest = (url: string, data: any = {}, config = {}) => {
    data['_method'] = 'PATCH'
    return event.getRequest(url, data, config)
  }

  return [state, { getRequest }]
}

export const useDelete = (init?: any) => {
  const [state, event] = usePost(init)

  const getRequest = (url: string, data: any = {}, config = {}) => {
    data['_method'] = 'DELETE'
    return event.getRequest(url, data, config)
  }

  return [state, { getRequest }]
}

export default useRequest
