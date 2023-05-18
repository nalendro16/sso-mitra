import { Modal } from 'components'
import { useGlobalContext } from 'hooks/context'
import React, { useEffect } from 'react'
import renderMessageError from 'utils/renderMessageError'

export const ModalAlert: React.FC = () => {
  const { alert, closeAlert } = useGlobalContext()

  useEffect(() => {
    window.onpopstate = () => {
      if (alert.isOpen) {
        closeAlert({ isConfirm: false })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert])

  return (
    <Modal
      dialogClassName='p-8'
      contentClassName='bg-white rounded-md p-4'
      show={alert.isOpen}
      onHide={() => closeAlert({ isConfirm: false })}
    >
      <div>
        {alert.title && (
          <div className='font-semi-bold text-sm mb-2 text-center'>
            {alert.title}
          </div>
        )}

        <div className='my-2 text-center'>
          <p className='!text-base'>
            {renderMessageError(alert.messages, true, 'text-base')}
          </p>
        </div>

        {alert.showFooter && (
          <div
            className={
              'flex items-center justify-center font-semi-bold text-xs mt-4'
            }
          >
            {alert.showBtnClose && (
              <div
                className='px-2 w-32 h-12 rounded-md border border-secondary grid place-items-center'
                onClick={() => closeAlert({ isConfirm: false })}
              >
                <p className='text-center my-auto text-sm'>
                  {alert.btnCloseText}
                </p>
              </div>
            )}
            {alert.isConfirm && (
              <div
                className='ml-3 px-2 bg-primary-base w-32 h-12 rounded-md grid place-items-center'
                onClick={() => closeAlert({ isConfirm: true })}
              >
                <p className='text-neutral-10 text-center text-sm'>
                  {alert.btnConfirmText}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  )
}
