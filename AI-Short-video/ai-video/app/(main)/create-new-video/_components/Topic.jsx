import { Input } from '@/components/ui/input'
import React from 'react'

const Topic = () => {
  return (
    <div><h2 className='mb-2'>
        Project Title 
    </h2>
    
    
    <Input placeholder='Enter project title' />
<div className='mt-5'>
<h2>Video Topic </h2>
<p className='text-sm text-gray-600'>Select topic for your video</p>
</div>
    </div>
  )
}

export default Topic