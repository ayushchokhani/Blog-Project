import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import {Header, Footer} from "./components/index"
import {Outlet} from "react-router-dom"
import conf from './conf/conf'

function App() {
  
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData)

  // in useeffect checking if user is logged in or not
  useEffect(() => {
    authService.getCurrentUser()
    // .then when user is successfully found
    .then((userData) => {
      // if user data is found 
      if(userData) {
        dispatch(login({userData})) // passing userData as object
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  // console.log(process.env.REACT_APP_APPWRITE_UR) --> for create react app 
  // console.log(import.meta.env.VITE_APPWRITE_URL)

  // doing conditional rendering 
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
