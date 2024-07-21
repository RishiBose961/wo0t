import React from 'react'
import LikeCountChart from '../../components/DashboardComp/LikeCountChart'
import TableShow from '../../components/DashboardComp/TableShow'

const DashBoard = () => {
  return (
    <div className=' max-w-7xl mx-auto'>
      <LikeCountChart/>
      <TableShow/>
    </div>
  )
}

export default DashBoard