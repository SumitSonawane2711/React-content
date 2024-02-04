import React, { useState } from 'react';
import { account } from '../appwrite/conf';
import { useNavigate } from 'react-router-dom';

function Login () {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email==""|| password==""){
        alert('pleased provide valid informations')
    }
    else{
        login();
    }
  };

  const login = async()=>{
   try {
    const x =await account.createEmailSession(email,password)
    navigate('/Dashboard')
   } catch (error) {
    console.log(error);
    alert('invalid credentials')
   }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
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
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};


export default Login