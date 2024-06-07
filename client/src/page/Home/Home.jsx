import React from 'react'
import MainComp from '../../components/Main/MainComp'

const Home = () => {

  let height = screen?.height;
  return (
    <div className="flex justify-end  sm:h-[450px]  mt-3 rounded-lg overflow-hidden " style={{ height: `90vh` }}>
       <div className=" overflow-auto pb-16">
      <MainComp/>
      </div>
    </div>
  )
}

export default Home