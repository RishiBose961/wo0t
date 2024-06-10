import React from 'react'
import MainComp from '../../components/Main/MainComp'

const Home = () => {

  return (
    <div className="flex justify-center  sm:h-[450px]  mt-3 rounded-lg overflow-hidden " style={{ height: `90vh` }}>
       <div className=" overflow-auto pb-16">
      <MainComp/>
      </div>
    </div>
  )
}

export default Home