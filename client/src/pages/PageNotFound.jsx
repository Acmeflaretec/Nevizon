import React from 'react'
import pgnot from '../assets/images/404.gif'
import Footer from '../components/Footer'
import MiddleNav from '../components/MiddleNav'

function PageNotFound() {
  return (
   <>
     
      <MiddleNav/>
    
      <div className='d-flex justify-content-center '>
        <img src={pgnot} alt="" />
      </div>
      <Footer/>
   </>
  )
}

export default PageNotFound