import React from 'react'
import {Container, Logo, LogoutButton} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Link is only valid till if you include inside webpage(DOM) like anchor or a tag inside html page because Link is same as a tag. But useNavigate is a function or hook what's use anywhere in your code. Because useNavigate not need to add inside DOM.

function Header() {
  const authStatus = useSelector((state) => state.auth.status)     // Accessing the status from store 'authSlice'
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      path: "/",
      active: true
    }, 
    {
      name: "Log In",
      path: "/login",
      active: !authStatus,
  },
  {
      name: "Sign Up",
      path: "/signup",
      active: !authStatus,
  },
  {
      name: "Compiler",
      path: "/compiler",
      active: authStatus,
  },
  {
      name: "Contact Us",
      path: "/contact-us",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-[#27283D]'>
      <Container>
        <nav className='flex'>

          <div className='flex mr-4'>
            <Link to='/'>
              <Logo className='text-white' width='70px'   />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (         // If the item is active show something or return null (using turnery operator)
              <li key={item.name}>
                <button
                onClick={() => navigate(item.path)}
                className='inline-block px-6 py-2 text-white font-bold duration-200 hover:bg-blue-700 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}

            {/* Conditional rendering */}
            {authStatus && (    //If authStatus is true then the LogoutBtn will be shown otherwise not
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;