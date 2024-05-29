import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import MessageContainer from '../../Components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden  bg-slate-950 bg-clip-padding '>
    <Sidebar/>
    <MessageContainer/>
  </div>
  )
}

export default Home
