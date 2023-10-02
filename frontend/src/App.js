import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Browse from './components/Browse'
import Favourites from './components/Favourites'
import Homepage from './components/Homepage'
import Profile from './components/Profile'
import Search from './components/Search'


function App(){
  return (
    <div className="App">
      <h1>Welcome Nerds</h1>
      <nav>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/browse'>Browse</a></li>
          <li><a href='/favourites'>My Favourites</a></li>
          <li><a href='/profile'>My Profile</a></li>
          <li><a href='/search'>Search</a></li>
        </ul>
      </nav>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/favourites'element={<Favourites/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/search' element={<Search/>}/>
        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
