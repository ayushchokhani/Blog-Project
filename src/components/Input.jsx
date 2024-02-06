import React, {useId} from 'react'

// using arrow function so make understanding of things easier
// wrapping everything in forwardRef hook
const Input = React.forwardRef( function Input({
    label,
    type = "text", // password type etc just giving a default value
    className = "",
    ...props
}, ref) { // passing of reference 

    const id = useId()

    return (
        <div className='w-full'>
            {/* if label is passed then label will be displayed*/}

            {label && <label 
                className='inline-block mb-1 pl-1' 
                htmlFor={id}> 

                {label}  
                </label>
            }

            <input 
            type= {type}
            className={` ${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50
            duration-200 border border-gray-200 w-full `}

            ref={ref} // most important ---> taking reference 
            {...props}
            id = {id} // same unique id for label and input
            />
        </div>
    )
})

export default Input