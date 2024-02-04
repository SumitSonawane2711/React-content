import React, { useEffect } from 'react'
import {account } from '../appwrite/conf.js' 

function Home() {

useEffect(()=>{
  console.log(account);
},[])

  return (
    <div>Home</div>
  )
}

export default Home