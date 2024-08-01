import React from 'react'
import LikeCountChart from '../../components/DashboardComp/LikeCountChart'
import TableShow from '../../components/DashboardComp/TableShow'

const DashBoard = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <LikeCountChart/> 
      
      <TableShow/>
    
    
    </div>
  )
}

export default DashBoard