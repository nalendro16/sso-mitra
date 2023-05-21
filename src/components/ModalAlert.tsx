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
      contentClassName='bg-white rounded-md p-4 animate-open-alert shadow-xl'
      show={alert.isOpen}
      onHide={() => closeAlert({ isConfirm: false })}
    >
      <div>
        {alert.images && (
          <div className='w-full flex justify-center'>
            <img src={alert.images} alt='' className={alert.imagesClassName} />
          </div>
        )}

        {alert.title && (
          <div className='font-bold mb-2 text-center text-primary-darker'>
            {alert.title}
          </div>
        )}

        <div className='my-2 text-center'>
          <div className='!text-base'>
            {renderMessageError(alert.messages, true, 'text-base')}
          </div>
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
                className={`ml-3 px-2 bg-primary-base w-32 h-12 rounded-md grid place-items-center ${
                  !alert.showBtnClose && 'w-full max-w-content'
                }`}
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
