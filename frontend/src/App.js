import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css';

//pages
import Browse from './components/Browse'
import Favourites from './components/Favourites'
import Homepage from './components/Homepage'
import Profile from './components/Profile'
import Search from './components/Search'
import Login from './components/Login';

//layout
import NavLayout from './layouts/NavLayout';
import PropertyCard from './components/PropertyCard';

// browser router i.e. route tree
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path= '/' element={<NavLayout/>}>
        <Route index element={<Homepage/>}/>
        <Route path='/browse' element={<Browse/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/favourites' element={<Favourites/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/property' element={<PropertyCard/>}/>
      </Route>
  )
)

function App(){
  return (


    <RouterProvider router={router}/>

  );
}

export default App;
