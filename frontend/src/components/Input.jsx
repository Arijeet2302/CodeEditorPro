import React, {useId} from 'react'

//The forwardRef hooks allows React users to pass refs to child components. The ref can be created and referenced with useRef or createRef and then passed in a parent component. Using forwardRef instead of useRef is useful when a ref needs to be accessed in a parent component.

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){                //Also, a 'ref' will be passed by its parent component
    const id = useId()
    return (
        <div className='w-full'>

            {label && <label            //If label is passed then display label component otherwise not
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }

            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}           // The state access will be passed through this 'ref'
            {...props}
            id={id}
            />

        </div>
    )
})

export default Input;