import React from 'react'
import "../Navbar/Navbar.css"
import Logo from "../../assets/ckLogo.svg"
import ProfileIcon from "../../assets/Profile.svg"

function Navbar() {
  return (
    <div className='navbar'>
      <div className='navbarLogo'>
        <img src={Logo} alt='logo'/>
      </div>
        <div className='heading'>
          <span>Customer Information</span>
        </div>

        <div className='profile'>
          <img src={ProfileIcon} alt='prof' />
        </div>
    </div>
  )
}

export default Navbar
