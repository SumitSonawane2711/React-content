import React from 'react'
import {Link,NavLink} from 'react-router-dom'


function Header() {
  return (
    <header className=' shadow sticky top-0 z-50'>
        <nav className=' bg-black text-white px-4 py-2.5 lg:px-6 border-red-600 '>
            <div className='items-center flex justify-between flex-wrap mx-auto max-w-screen-xl'>
                <Link to='/' className='flex-item-center'>
                 <img
                 src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                 className="mr-3 h-12"
                 alt="Logo"
                 />
                </Link>

                <div className=' flex items-center lg:order-2'>
                    <Link to='/Register'
                    className=' hover:bg-blue-500 hover:font-bold  font-medium rounded-lg text-sm px-4 
                           lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                      SignUp
                    </Link>
                    <Link to='/Login'
                    className=' hover:bg-blue-500 hover:font-bold  font-medium rounded-lg text-sm px-4 
                           lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                      SignIn
                    </Link>
                </div>
                <div className='w-full lg:flex lg:w-auto lg:order-1 flex flex-wrap justify-between  '>
                    <ul className='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
                        <li>
                            <NavLink to='/'
                            className={({isActive})=>` py-2 pr-4 pl-3 duration-200 ${isActive ? "text-red-600":"text-white" } border-b 
                            border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0`}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/About'
                            className={({isActive})=>` py-2 pr-4 pl-3 duration-200 ${isActive ? "text-red-600":"text-white" } border-b 
                            border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0`}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact'
                            className={({isActive})=>` py-2 pr-4 pl-3 duration-200 ${isActive ? "text-red-600":"text-white" } border-b 
                            border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-red-400 lg:p-0`}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </header>
  )
}

export default Header