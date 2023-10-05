// // Add NavLinks here.

import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import './NavLayout.css'


function NavLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      <header>
        <nav>
          <h1>HME</h1>
          <MenuIcon onClick={toggleDrawer(true)} className="menu-icon" />
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <div className="drawer-content" >

              {/* an alternative to the "activeClassName" would be much appreciated - I don't want to 
              do this for every NavLink if I can avoid it */}

              <NavLink to="/" activeClassName='active'>Home</NavLink>
              <NavLink to="/browse" activeClassName='active'>Browse</NavLink>
              <NavLink to="/profile" activeClassName='active'>My Profile</NavLink>
              <NavLink to="/favourites" activeClassName='active'>My favourites</NavLink>
              <NavLink to="/login" activeClassName='active'>Login</NavLink>
              <NavLink to="/search" activeClassName='active'>Search</NavLink>
              <NavLink to="/property" activeClassName='active'>Property</NavLink>
            </div>
          </Drawer>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default NavLayout;
