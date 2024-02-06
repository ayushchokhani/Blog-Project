import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from "react-router-dom"

// $id ---> syntax of appwrite
function PostCard({$id, title, featuredImage}) {

  return (
    // in link we don't have to provide full url, we can just provide it with forward url (from present page)
    // $id --> is the variable
    <Link to={`/post/${$id}`} >
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4 '>
                {/* now for image we want a preview and we have made a function getFilePreview in appwriteService
                 */}
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title} 
                className='rounded-xl'
                />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard