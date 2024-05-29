import React from 'react'

import SearchInputs from './SearchInputs'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const Sidebar = () => {
  return (
    <div className='border-r border-blue-500 p-4 flex flex-col '>
        <SearchInputs/>
        <div className='divider px-3'>  </div>
         <Conversations/>
         <LogoutButton/> 
      

      
    </div>
  )
}

export default Sidebar
