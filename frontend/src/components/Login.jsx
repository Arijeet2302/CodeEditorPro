import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as storeLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth.js"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm()    // "react-hook-form" documentation

    const [error, setError] = useState("")      // For showing the error

    const login = async(data) => {
        setError("")    // When the submission process begins the error should be clean
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()   // fetching userData from authService
                if(userData) dispatch(storeLogin(userData));      // Dispatching the login data to the store
                navigate("/")       // When user logged in send the user to "/" path
                alert("User Logged In Successfully")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
                      <span className="inline-block w-full max-w-[100px]">
                          <Logo width="100%" />
                      </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
          <p className="mt-2 font-semibold text-center text-base text-black/60">
                      Don&apos;t have any account?&nbsp;
                      <Link
                          to="/signup"
                          className="font-medium text-primary transition-all duration-200 hover:underline"
                      >
                          Sign Up
                      </Link>
          </p>

          {/* Conditional rendering */}
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}  

          {/* handleSubmit() is an event taken from useForm() & login() is our function */}
          <form onSubmit={handleSubmit(login)} className='mt-8'>    
              <div className='space-y-5'>

                  <Input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {     //register() taken from useForm() & we need to spread this every time
                      required: true,
                      validate: {
                          matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                          "Email address must be a valid address",
                      }
                  })}
                  />

                  <Input
                  label="Password: "
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                      required: true,
                  })}
                  />
                  
                  <Button
                  type="submit"
                  className="w-full font-bold"
                  >Sign in</Button>
              </div>
          </form>
        </div>
    </div>
  )
}

export default Login;