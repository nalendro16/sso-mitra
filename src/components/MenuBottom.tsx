import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface MenuItem {
  icon: string | null
  icon_active: string | null
  title: string
  to: string
  secondary_to?: string | null
  third_to?: string | null
}

interface MenuBottomProps {
  menu: MenuItem[]
}

export const MenuBottom: React.FC<MenuBottomProps> = ({ menu }) => {
  const location = useLocation()

  const isActive = (item: MenuItem) => {
    return (
      location.pathname === item.to ||
      location.pathname === item.secondary_to ||
      location.pathname === item.third_to
    )
  }

  return (
    <div className='safe-bottom flex items-center fixed bottom-0 w-full max-w-content bg-white top-shadow z-50 -ml-4'>
      {menu.map((item, key) => (
        <NavLink
          key={key}
          replace={!(item.to === '/scan-qr')}
          to={item.to}
          className='flex flex-1 items-center justify-center text-xxs flex-col'
        >
          {/* {isActive(item) ? (
            <div className='bg-secondary w-9 h-1 top-0 rounded-md absolute'></div>
          ) : (
            ''
          )} */}
          <div className='group relative flex flex-col items-center justify-center text-center w-full h-[4rem]'>
            {item.icon && item.icon_active ? (
              <div className='flex items-center justify-center'>
                <img
                  className='w-6 h-6 mb-1'
                  src={isActive(item) ? item.icon_active : item.icon}
                  alt=''
                />
                {!isActive(item) && (
                  <img
                    className='w-6 h-6 mb-1 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    src={item.icon_active}
                    alt=''
                  />
                )}
              </div>
            ) : (
              <>
                <div className='absolute top-[-50%] bg-primary-base rounded-full w-[60px] h-[60px] flex items-center justify-center drop-shadow-primary-base'>
                  {item.icon_active && (
                    <img className='w-10 h-10' src={item.icon_active} alt='' />
                  )}
                </div>
                <div className='w-6 h-6 mb-1' />
              </>
            )}
            <div
              className={`opacity-50 group-hover:opacity-100 transition-opacity duration-300 ${
                isActive(item) && 'font-semi-bold text-primary-base opacity-100'
              }`}
            >
              {item.title}
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  )
}
