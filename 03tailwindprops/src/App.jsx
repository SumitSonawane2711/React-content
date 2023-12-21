import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card  from './componenes/Card'

function App() {

  return (
    <>
      <h1 className='bg-green-500 text-black p-4 rounded-xl'>Tailwind Test</h1>
      <Card heading = "About DELL" btntext =  "Push" />
      <Card heading = "About ASUS" btntext = "Click ME" />
      <Card />
    </>
  )
}

export default App
