

import {BrowserRouter,Form,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Storage from './pages/Storage'
import Header from './components/Header'
import About from './pages/About'
import Verify from './pages/Verify'
import Contact from './pages/contact'
function App() {

  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/Register' element={<Register/>}></Route>
    <Route path='/Login' element={<Login/>}></Route>
    <Route path='/Dashboard' element={<Dashboard/>}></Route>
    <Route path='/Storage' element={<Storage/>}></Route>
    <Route path='/About' element={<About/>}></Route>
    <Route path='/Verify' element={<Verify/>}></Route>
    <Route path='/Contact' element={<Contact/>}></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default App
