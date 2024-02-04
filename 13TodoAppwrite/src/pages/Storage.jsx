import React, { useEffect, useState } from 'react'
import {account } from '../appwrite/conf.js' 
import { useNavigate } from 'react-router-dom'
import { storage } from '../appwrite/conf.js'

function Storage() {
    const[pic,setPic]=useState();
    const[imgid,setImgid]=useState()
    const[hr,setHr]=useState()
     
    const handleSubmit= async(e)=>{
        e.preventDefault()
        if(pic!=null){
            try {
                var x=await storage.createFile(import.meta.env.VITE_APPWRITE_BUCKET_ID,"unique()",pic)
                setImgid(x.$id)
             } catch (error) {
                 console.log(error);
             }
        } 
    }

    const getImg =async ()=>{
        console.log(imgid);
        try {
           var x=await storage.getFile(import.meta.env.VITE_APPWRITE_BUCKET_ID,imgid)
           console.log(x);
        } catch (error) {
            console.log(error);
        }
    }

    const downloadImg=async ()=>{
        try {
            var x= await storage.getFileDownload(import.meta.env.VITE_APPWRITE_BUCKET_ID,imgid)
            console.log(x.href);
            setHr(x.href)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteimg = async(e)=>{
        e.preventDefault()
        try {
            var x =await storage.deleteFile(import.meta.env.VITE_APPWRITE_BUCKET_ID,imgid)
        } catch (error) {
            
        }
    }
    
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="file" name='file' required onChange={(e)=>setPic(e.target.files[0])}></input>
        <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
        {imgid?<>
            <button onClick={deleteimg} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">delete</button>
            <button onClick={getImg} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">getImg</button>
            <button onClick={downloadImg} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">downloadImg</button>
            {hr?<a href={hr} download>Click to download Img</a>:<></>}
        </>  
          :<></>
        }
    </form>
    </>
  )
}

export default Storage