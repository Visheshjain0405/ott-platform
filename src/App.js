import logo from './logo.svg';
import './App.css';
import Navbar  from './Component/Navbar/Navbar';
import Home from './Component/Home/Home';
<<<<<<< HEAD
import { Routes,Route,Navigate } from 'react-router-dom';
=======
import { Routes,Route } from 'react-router-dom';
>>>>>>> 123e60324666a2680efffd5e3bfca46eef491b98
import MovieDisplay from './Component/Movie/MovieDisplay';
import Dashboard from './Component/Admin/Dashboard/Dashboard';
import MovieDetails from './Component/Movie/MovieDetails';
import Movies from './Component/Admin/Dashboard/Movies';
import Movieplay from './Component/Movie/Movieplay';
import MovieType from './Component/Movie/MovieType';
import Login from './Component/Pages/Login';
import Signup from './Component/Pages/Signup';
import AddMovie from './Component/Admin/Dashboard/AddMovie';
<<<<<<< HEAD
import AdminLogin from './Component/Admin/Pages/AdminLogin';


const ProtectedRoute=({children})=>{
  const isAuthenticated=sessionStorage.getItem("auth")==="true";
  return isAuthenticated?children:<Navigate to="/admin/login"/>
}
=======

>>>>>>> 123e60324666a2680efffd5e3bfca46eef491b98
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
      <Route path='/adminmovie' element={<Movies/>}/>
<<<<<<< HEAD
      <Route path='/admin' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/addmovie' element={<AddMovie/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
=======
      <Route path='/admin' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/addmovie' element={<AddMovie/>}/>
>>>>>>> 123e60324666a2680efffd5e3bfca46eef491b98
    </Routes>
    </div>
  );
}

export default App;
