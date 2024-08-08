import  Navbar  from '../Navbar/Navbar'
import React from 'react'
import Movies from './Movies'
import MovieSlider from './Slider/MovieSlider'
import MovieDisplay from '../Movie/MovieDisplay'
import Footer from './Footer/Footer'
function Home() {
  return (
    <div>
        <Navbar/>
        {/* <Slider/> */}
        <MovieSlider/>
        {/* <Movies/> */}
        <MovieDisplay type="bollywood"/>
        <MovieDisplay type="south"/>
        <MovieDisplay type="hollywood"/>
        <Footer/>
    </div>
  )
}

export default Home