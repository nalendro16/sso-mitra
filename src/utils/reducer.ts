import { actionType } from 'config/state'

class Reducer {
  _state: any
  constructor(state: any, dispatch: any) {
    this.dispatch = dispatch
    this._state = state
  }

  dispatch(action: any) {
    this.dispatch(action)
    return this
  }

  then(callback: any) {
    return this.dispatch({ type: actionType.RESOLVE, callback })
  }
}

export default Reducer