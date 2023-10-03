// Add NavLinks here.

import { Outlet, NavLink } from "react-router-dom";


function NavLayout(){
    return(
        <div>
              <header>
      <nav>
        <h1>HME</h1>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/browse">Browse</NavLink>
        <NavLink to="/profile">My Profile</NavLink>
        <NavLink to="/favourites">My favourites</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/search">Search</NavLink>
      </nav>
    </header>
    <main>
      <Outlet/>
    </main>

      </div>
      )

}

export default NavLayout;