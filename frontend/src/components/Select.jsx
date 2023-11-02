import React, {useId} from 'react'

function Select({
    options,
    label,
    className="",
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}        
        <select
        {...props}
        id={id}
        ref={ref}       // The state access will be passed through this 'ref'
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option) => (         // Using "?" to ensure "options" are passed before calling map() 
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select);