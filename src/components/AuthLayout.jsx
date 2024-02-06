import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    // by default authentication is true
    
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)


    // we can also do it by not taking authentication from user 
    // if(authStatus === true) {
    //     navigate('/')
    // }
    // else if(authStatus !== true) {
    //     navigate('/login')
    // }

    // useEffect is important here
    useEffect(() => {
        if(authentication && authStatus !== authentication) {
            navigate('/login')
        }
        else if(!authentication && authStatus !== authentication) {
            navigate('/')
        }

        setLoader(false)

    }, [authStatus, navigate, authentication])
    // we want to check when user navigate from one page to another so navigate is also in dependency array

  return loader ? <h1>Loading...</h1> : <>{children}</> 
}

