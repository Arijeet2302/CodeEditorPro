import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)   
  const dispatch = useDispatch()

  useEffect(() => {       //Checking the user is logged in or not from authService.getCurrentUser
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))   // If user logged in then dispatch the userData to login() [authSlice.reducer]
      } else {
        dispatch(logout())    // Updating the state that our user is logged out
      }
    })
    .finally(() => setLoading(false))
  }, [])

  // Conditional rendering
  return !loading ? (                     // If loading is false we will show the data
    <div className='min-h-screen flex flex-wrap content-between bg-gray-300'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null                              // If true then we will return null or we can add loading... text
 
}

export default App;
