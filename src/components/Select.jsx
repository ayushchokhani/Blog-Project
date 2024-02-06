import React, {useId} from 'react'

function Select({
    options,
    label,
    className='',
    ...props
}, ref) {

    const id = useId()

  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}

        <select
        {...props}
        id={id}
        ref = {ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >

            {/* options by default is an array  */}
            {/* optionally looping so that if no values present in options app does not crashes */}
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}

        </select>
    </div>
  )
}

// this is also one of the syntax for using forward ref
export default React.forwardRef(Select)