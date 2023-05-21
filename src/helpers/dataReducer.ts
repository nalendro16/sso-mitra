import { actionType } from 'config/state'

export const requestReducer = (state: any, action: any) => {
  switch (action.type) {
    case actionType.LOADING:
      return {
        ...state,
        data: null,
        isLoading: true,
        error: null,
      }
    case actionType.SUCCESS:
      return {
        ...state,
        data: action.data,
        isLoading: false,
        error: null,
      }
    case actionType.UNAUTHORIZED:
    case actionType.ERROR:
    case actionType.BAD_REQUEST:
    case actionType.INTERNAL_SERVER_ERROR:
    case actionType.UNPROCESSABLE_ENTITY:
    case actionType.NOT_ACCEPTABLE:
    case actionType.NOT_FOUND:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    default:
      return state
  }
}

export const alertReducer = (state: any, action: any) => {
  switch (action.type) {
    case actionType.OPEN:
      return {
        ...state,
        isOpen: true,
        title: action.title,
        messages: action.messages,
        images: action.images,
        imagesClassName: action.imagesClassName,
        isConfirm: action.isConfirm ?? false,
        showFooter: action.showFooter ?? true,
        showBtnClose: action.showBtnClose ?? true,
        btnCloseText: action.btnCloseText ?? 'Tutup',
        btnConfirmText: action.btnConfirmText ?? 'Ya',
        callback: action.callback,
      }
    case actionType.CLOSE:
      return {
        ...state,
        isOpen: false,
      }
    case actionType.RESOLVE:
      return {
        ...state,
        callback: action.callback,
      }
    default:
      return state
  }
}
