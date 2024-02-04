import React, { useEffect, useState } from 'react';
import { account, database } from '../appwrite/conf';
import { useNavigate } from 'react-router-dom';
import { Query } from 'appwrite';


function Dashboard () {
  const navigate = useNavigate()
  const[email,setEmail] = useState("")
  const[name,setName] = useState('')
  const[todo,setTodo]= useState('')
  const[alltodo,setAlltodo]= useState([])

  const handleLogout = async()=>{
    try {
      var x = await account.deleteSession('current')
      navigate('/Login')
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(()=>{
    islogin();
    //ShowTodo()
  },[alltodo,setAlltodo])

  const islogin= async()=>{
    try {
      var x = await account.get("current")
      
      setEmail(x.email)
      setName(x.name)
      console.log(x);
      ShowTodo()
    } catch (e) {
      //navigate('/Login')
    }
  }
   
  const AddTodo =async()=>{
    if(todo==""){
      alert("enter some todo")
    }
    else{
      try {
        var x =await database.createDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID,'unique()',{email:email,todo:todo})
          //console.log(x);
        } catch (error) {
        console.log(error);
      }
    }
      
  }

  const update = async(id)=>{
    try {
      var x= await database.updateDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,id,{todo:"I am updated"})
        console.log(x.documents);
    } catch (error) {
      console.log(error);
    }
  }
   
  const deletetodo = async(id)=>{
    try {
      database.deleteDocument(import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,id)
    } catch (error) {
      console.log(error);
    }
  }
  const ShowTodo =async ()=>{
    try {
      var x =await database.listDocuments(import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,[Query.equal('email',email)])
        console.log(x.documents);
        setAlltodo(x.documents)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {name&&email?<> <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <p className="text-gray-800">{name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <p className="text-gray-800">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
        <br></br>
        <br/>
        <br />
        <input value={todo} onChange={(e)=>setTodo(e.target.value)} className="w-full border rounded-md p-2" placeholder='add your todo'></input>
        <br></br>
        <br></br>
        <button onClick={AddTodo} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Add Todo </button>
        {alltodo!=[]?<div>
          {alltodo.map(e=>{
            return(
              <>
              <p>{e.todo}</p>
              <button onClick={()=>update(e.$id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Update</button>
              <button onClick={()=>deletetodo(e.$id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">delete</button>
              </>
          )})}
        </div>
        :<></>}
        </>:<> Loading......  </>
        
        }
       
      </div>
    </div>
  );
};

export default Dashboard;