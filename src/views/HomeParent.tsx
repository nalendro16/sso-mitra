import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Order, Profile, Transaksi } from 'views'
import { MenuBottom } from 'components'
import { MENU_BOTTOM } from 'config/menu'

export const HomeParent: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/order' element={<Order />} />
        <Route path='/transaksi' element={<Transaksi />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <MenuBottom menu={MENU_BOTTOM} />
    </>
  )
}
