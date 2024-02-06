import React from 'react'
import {Container, Logo, LogoutBtn} from "../index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  // state.auth because it is in authSlice
  const navigate = useNavigate()

  //in production grade generally objects are made in array as it becomes easier to add it to navigation bar
  const navItems = [
    // we are checking authStatus from above and those who are active we will show them these features otherwise we wil not show them
    {
      name: 'Home',
      slug: '/', // we can call slug as url too, our choice
      active: true
    }, 
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 '>
            {/* just wrapping it inside link  */}
            <Link to='/' >
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) => 
              // if item active then showing something else null
              // use key for repeating html values
              item.active ? (
                <li key={item.name}> 
                  <button
                  // this navigate comes from react-router-dom
                  // this just takes us to provided url
                  onClick={() => navigate(item.slug)}
                  className='inline-block px-6 py-2 duration-200 hover: bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {/* doing below for providing logout btn to user 
            if user is authenticated then only show logout so using && sign */}

            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )} 
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header