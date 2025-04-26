"use client"

import { useAuthContext } from '@/app/provider'
import { SidebarTrigger } from '@/components/ui/sidebar'
import Image from 'next/image'

import React from 'react'

const AppHeader = () => {
    const {user} = useAuthContext()
  return (
    
    <div className='p-3 flex justify-between items-center'>
            <SidebarTrigger/>
            {user && user.pictureURL ? (
  <Image
    src={user.pictureURL}
    alt='user'
    width={40}
    height={40}
    className='rounded-full'
  />
) : null}


    </div>
  )
}

export default AppHeader