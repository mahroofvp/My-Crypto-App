import React from 'react'

import './banner.css'

import Carousel from './carousel/Carousel'

const Banner = () => {

   

  return (
    
    
        <div className="banner-img">
            <div className='banner-tagline-div'>

            <h1>My Crypto</h1>
            <h6> Get All The Info Regarding Your Favourite Crypto Currency</h6>
            </div>
            <div className='banner-carousel-div'>
              <Carousel/>
            </div>

        </div>
   
  )
}

export default Banner