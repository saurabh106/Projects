import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'

const suggestions = [
    "Historic Story",
    "Kids Story",
    "Movie Stories",
    "AI Innovations",
    "Space Mysteries",
    "Horror Stories",
    "Mythological Tales",
    "Tech Breakthroughs",
    "True Crime Stories",
    "Fantasy Adventures",
    "Science Experiements",
    "Motivational Stories"
    
]
const Topic = () => {
  const [selectTopic ,setSelectTopic] = useState(false)
  return (
    <div><h2 className='mb-2'>
        Project Title 
    </h2>
    
    
    <Input placeholder='Enter project title' />
<div className='mt-5'>
<h2>Video Topic </h2>
<p className='text-sm text-gray-600'>Select topic for your video</p>


<Tabs defaultValue="suggestion" className="w-full mt-2">
  <TabsList>
    <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
    <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
  </TabsList>
  <TabsContent value="suggestion"><div >
    {suggestions.map((suggestion,index)=>(
      <Button variant="outline" key={index} className="m-1">{suggestion}</Button>
    ))}
  </div></TabsContent>
  <TabsContent value="your_topic">Change your password here.</TabsContent>
</Tabs>

</div>
    </div>
  )
}

export default Topic