import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
let [counter,setCounter] = useState(10)

 // let counter = 5

  const addValue = () => {
    if(counter<20){
      counter = counter + 1
      setCounter(counter)
    }
    else{alert("value should not be greater than 20")}
   
  }

  const removeValue = () => {
    if (counter > 0) {
      counter = counter - 1
      setCounter(counter)
    }
    else{
      alert("Value should not be negative")
    }
  }
  return (
    <>
      <h1>Sumit aur react</h1>
      <h2>counter value : {counter}</h2>
      <button onClick={addValue}>Add value {counter}</button>
      <br />
      <button onClick={removeValue}>Remove value {counter}</button>
      <p>footer : {counter}</p>
    </>
  )
}

export default App
