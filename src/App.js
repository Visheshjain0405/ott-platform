import logo from './logo.svg';
import './App.css';
import Navbar  from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
import { Routes,Route } from 'react-router-dom';
import MovieDisplay from './Component/Movie/MovieDisplay';
import Dashboard from './Component/Admin/Dashboard/Dashboard';
import MovieDetails from './Component/Movie/MovieDetails';
import Movies from './Component/Admin/Dashboard/Movies';
import Movieplay from './Component/Movie/Movieplay';
import MovieType from './Component/Movie/MovieType';
import Login from './Component/Pages/Login';
import Signup from './Component/Pages/Signup';

function App() {
  return (
    <div className="">
      {/* <Home/> */}
      {/* <Navbar/> */}
      {/* <MovieDisplay/> */}
      {/* <Slider/> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/moviedisplay/:name" element={<MovieDetails />} />
      <Route path="/movieplay/:name" element={<Movieplay/>}/>
      <Route path='/movies/:type' element={<MovieType/>}/>
      <Route path='/addmovie' element={<Movies/>}/>
      <Route path='/admin' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </div>
  );
}

export default App;
