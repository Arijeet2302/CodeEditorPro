import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import {Home, Login, Signup, Compiler, ContactUs} from './pages'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
         {
            path: "/compiler",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Compiler />
                </AuthLayout>
            ),
        },
        {
            path: "/contact-us",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <ContactUs />
                </AuthLayout>
            ),
        },
       
    ],
},
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
