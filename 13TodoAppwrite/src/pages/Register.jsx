import React, { useState } from 'react';
import { account } from '../appwrite/conf';

function Register (){

const [email, setEmail] = useState("")
const [Name ,setName] = useState("")
const [password, setPassword] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    if(Name==""|| email==""|| password==""){
      alert('please enter correct deatils')
    }
    else{
      reg()
    }
    console.log('user data');
  }

  const reg = async()=>{
    try {
      var x = await account.create('unique()',email,password,Name)
      var session =await account.createEmailSession(email,password)
      var link = await account.createVerification('http://localhost:5173/Verify')
      console.log(x);
      if(x){
        alert("Register Successfully")
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={Name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) =>  setPassword(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Register
          </button>
        </form>
      </div>
    </div>
  );
  }

export default Register;