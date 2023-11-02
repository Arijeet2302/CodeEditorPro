import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Home() {
   
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    return  (
      
      
            <div className='w-full h-full flex relative'>

                <div className='h-full w-[55%]  px-[4vw] py-[2.5vw]'>        {/*Left div*/}

                    <h1 className='text-[3.5vw] leading-[4vw] font-bold'>Welcome to  
                    <span className='text-gray-600'> CodePro </span> 
                    The <span className='text-gray-600'> Coolest </span> 
                    coding platform in India.</h1>

                    <p className='text-[1.2vw] font-bold text-gray-800 w-4/5 my-[3vw]'>Welcome to CodePro - your go to code compiler. With a user-friendly and secure environment, explore a multitude of supported programming languages, write, compile code and your progress. We empower you to code with confidence and convenience. Start coding smarter today!</p>

                    <button
                    onClick={()=> {
                        navigate("/compiler")
                        !authStatus && alert("Please Sign in your account to use our Services.");
                    }} 
                    className='text-[1.4vw] font-bold  bg-[#27283D] text-white px-[1.8vw] py-[0.9vw] rounded-[5px] border-[none] duration-200 hover:bg-black'
                    >Explore Now</button>
                </div>

                <div className='h-full w-[45%]  px-[3.5vw] py-[2.5vw] '>             {/*Left div*/}
                    <img className=' h-full w-full' src='https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg?size=626&ext=jpg&ga=GA1.1.854686217.1698431524&semt=sph' alt="Coding illustration image"/>
                </div>

            </div>
      
    ) 
}

export default Home;
