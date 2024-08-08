import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Search } from 'react-feather';
import { Link } from 'react-router-dom';

function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [htmlCssOpen, setHtmlCssOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [jsOpen, setJsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-black shadow-md z-50">
      <div className="flex items-center justify-between h-full max-w-6xl mx-auto px-6">
        <div className="flex items-center">
          <button onClick={() => setNavbarOpen(!navbarOpen)} className="lg:hidden text-white">
            <Menu />
          </button>
          <a href="#" className="ml-4 text-2xl font-bold text-white">Cinema Hub</a>
        </div>
        <div className={`fixed top-0 left-0 w-64 h-full bg-black transform ${navbarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:w-auto lg:h-auto lg:translate-x-0 lg:flex lg:items-center lg:justify-between`}>
          <div className="flex items-center justify-between p-4 lg:hidden">
            <span className="text-xl font-bold text-white">CodingLab</span>
            <button onClick={() => setNavbarOpen(!navbarOpen)} className="text-white">
              <X />
            </button>
          </div>
          <ul className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-6 lg:items-center">
            <Link to="/"><a href="#" className="text-white p-3">HOME</a></Link>
            <Link to="/movies/bollywood"><a href="#" className="text-white p-3">BOLLYWOOD</a></Link>
            <Link to="/movies/southhindidubbedmovies"><a href="#" className="text-white p-3">SOUTH HINDI DUBBED</a></Link>
            <Link to="/movies/hollywood"><a href="#" className="text-white p-3">HOLLYWOOD</a></Link>
            <Link to="/movies/webseries"><a href="#" className="text-white p-3">CONTACT US</a></Link>

          </ul>
        </div>
        <div className="relative">
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-white">
            {searchOpen ? <X /> : <Search />}
          </button>
          {searchOpen && (
            <div className="absolute right-0 top-10 bg-black p-2 rounded-md shadow-lg">
              <input type="text" placeholder="Search..." className="w-64 p-2 rounded-md outline-none" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default App;
