import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

function Myapp(){
  return(
    <div>
      <h1>Custom App | chai</h1>
    </div>
  )
}

// const reactElement = {
//   type: 'a',
//   props:{
//       href:'https://google.com',
//       target: '_blank'
//   },
//   children: 'Click to visite google'
// }

const anotherElement=(
  <a href="https://google.com" target='_blank'>Visit google</a>
)

const anotherUser = "chai aur react"

const reactElement = React.createElement(
  'a',
  {href:'https://google.com',target:'_blank' },
  'click me to viste google',
  anotherElement
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
