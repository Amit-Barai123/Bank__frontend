import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="navbar__area ">
      <a className='fs-1' href="#">SBI Bank</a>
      
      <Link to='/register' className='btn btn-primary'>Register</Link>
    </div>
</nav>

  )
}

export default Header
