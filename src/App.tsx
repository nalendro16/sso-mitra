import React, { Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import {
  Component,
  Login,
  HomeParent,
  VerifyOtp,
  PasswordReset,
  SplashScreen,
  RequestSedot,
  Payment,
  TrackOrder,
  AddressList,
  AddAddress,
  PaymentConfirmed,
  KalenderSedot,
  HomeWithdraw,
  AddAccountBank,
  DetailKontruksiLayanan,
  DetailKontruksiOrder,
  RancanganAnggaranBiaya,
} from 'views'
import { isLogin } from 'utils/auth'
import { ModalAlert } from 'components'
import { App as AppCap } from '@capacitor/app'
import { useGlobalContext } from 'hooks/context'

type Props = {
  basename: string
}

const PrivateRoute = ({ wrapperContent = true }) => {
  if (!isLogin()) {
    return <Navigate to='/' replace />
  }
  return wrapperContent ? (
    <div className='content' id='content'>
      <Outlet />
    </div>
  ) : (
    <Outlet />
  )
}

const ProtectedRoute = ({ wrapperContent = true }) => {
  if (isLogin()) {
    return <Navigate to='/home' replace />
  }
  return wrapperContent ? (
    <div className='content' id='content'>
      <Outlet />
    </div>
  ) : (
    <Outlet />
  )
}

const App: React.FC<Props> = ({ basename }) => {
  const { openAlert } = useGlobalContext()

  useEffect(() => {
    AppCap.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back()
      } else {
        openAlert({
          messages: 'Tutup Aplikasi Sajang?',
          isConfirm: true,
          btnConfirmText: 'Ya',
          btnCloseText: 'Tidak',
          callback: (e: any) => {
            if (e.isConfirm) {
              AppCap.exitApp()
            }
          },
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Suspense fallback={() => 'loading ....'}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path='/' element={<SplashScreen />} />
          <Route element={<ProtectedRoute wrapperContent={false} />}>
            <Route path='/login' element={<Login />} />
            <Route path='/verify-otp' element={<VerifyOtp />} />
            <Route path='/password-reset' element={<PasswordReset />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/*' element={<HomeParent />}>
              <Route path='*' element={<Outlet />} />
            </Route>
            <Route path='/request-sedot' element={<RequestSedot />} />
            <Route path='/sedot-schedule' element={<KalenderSedot />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/payment-confirmed' element={<PaymentConfirmed />} />
            <Route path='/track-order/:id' element={<TrackOrder />} />
            <Route path='/address-list' element={<AddressList />} />
            <Route path='/add-address' element={<AddAddress />} />
            <Route path='/withdraw-home' element={<HomeWithdraw />} />
            <Route path='/add-bank-account' element={<AddAccountBank />} />
            <Route
              path='/detail-kontruksi'
              element={<DetailKontruksiLayanan />}
            />
            <Route
              path='/detail-kontruksi-order'
              element={<DetailKontruksiOrder />}
            />
            <Route
              path='/detail-kontruksi-rab'
              element={<RancanganAnggaranBiaya />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path='/component' element={<Component />} />
          </Route>
        </Routes>
        <ModalAlert />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
