import React from 'react'

function Button({
    children,  // this children could also have been said as btn text
    type = 'button', 
    // defining default type, can be changed to submit btn also
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
  return (
    // writing our default classname as well as injecting properties passed by user
    // {...props} ----> any additional property passed by user
    <button className={`px-4 py-2 roudend-lg ${bgColor} 
    ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button