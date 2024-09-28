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
        <MovieDisplay type="Bollywood"/>
        <MovieDisplay type="South"/>
        <MovieDisplay type="Hollywood"/>
        <MovieDisplay type="Web-Series"/>
        <Footer/>
    </div>
  )
}

export default Home