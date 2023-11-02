import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutButton() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {       //logout() returns a promise from authService
            dispatch(logout())          // Updating the state in our store
            alert("User Logged Out Successfully")
        })
    }
  return (
    <button
    className='inline-bock font-bold text-white px-6 py-2 duration-200 hover:bg-blue-700 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutButton;