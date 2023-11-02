// This component uses to protect pages or routes. It uses to render pages when the user is signed in.

import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function AuthLayout({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)  //Checking authStatus from Store

    useEffect(() => {

        //more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){        // true && false !== true
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){    // false && true !== true
            navigate("/")   
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])      //dependencies array

  return loader ? <h1>Loading...</h1> : <>{children}</>     // Conditional rendering
}

