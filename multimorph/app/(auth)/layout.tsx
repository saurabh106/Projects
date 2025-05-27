import React from 'react'
import '../globals.css';


const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <main className='flex justify-center items-center min-h-screen w-full bg-blue-100'>{children}</main>
  )
}

export default Layout