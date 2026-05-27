import React from 'react'
import {useState} from "react"
import { Link, useNavigate } from 'react-router-dom'
import { ArrowBigRight, Eye,EyeOff, LockKeyhole, Mail, User,ArrowRight } from 'lucide-react'

function Register() {
  const[name,setName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const [showpassword,setShowpassword] = useState("")
  const navigate = useNavigate()

  const sendrequest = async(e)=>{
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/api/users/register",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,
          email,
          password
        })
      })
      const data = await res.json()
      console.log(data)

      //clears the form after submission
        setName("")
        setEmail("")
        setPassword("")
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="flex md:flex-row shadow-lg rounded-2xl max-w-4xl w-full bg-white">
      
        <div className="w-1/2 p-5 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 flex flex-col items-center justify-center text-white text-center rounded-l-2xl">
        <h1 className='text-3xl font-bold mb-4'>JOIN Smart Park</h1>
        <p className='mb-8'>
          join CRPMC to streamline yor repairs,track every vehicle,and manage payments in one place.
        </p>
        <button onClick={()=>navigate("/")}className='bg-white px-8 py-2 rounded-2xl  cursor-pointer hover:px-10 duration-500 transition-all font-semibold text-[#0075A8]'>sign in →</button>
        </div>
        
        <div className='w-1/2 p-5'>
        <form className='bg-white p-8 rounded-2xl' >
            <h1 className='font-bold text-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text mb-2'>Register</h1>
            <p className='text-gray-500 font-medium text-[14px] mb-8'>create your account to continue</p>

            <label className='block text-black mb-2'>Username:</label>
            <div className="relative">
              <User className='absolute top-3 w-6 h-5 text-gray-400 left-2'size={20}/>
            <input 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            type="text" className='w-full border pl-10 pr-4 border-gray-300 p-3 rounded-xl focus:outline-[#0075A8]' placeholder='Enter your name...'></input>
            </div>
            <label className='block text-black mb-2 mt-4'>Email:</label>
            <div className="relative">
            <Mail className='absolute top-3 w-5 h-6 text-gray-400 left-2'size={20}/>
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)} 
            type="email" className='w-full border pl-10 pr-4 border-gray-300 p-3 rounded-xl focus:outline-[#0075A8]' placeholder='Enter your email...'></input>
            </div>
            <label className='block text-black mb-2 mt-4'>Password:</label>
            <div className="mb-6 relative">
              <LockKeyhole className='absolute text-gray-400 top-3 w-5 h-6 left-2'size={20}/>
            <input 
            value={password}
            onChange={(e)=>setPassword(e.target.value)} 
            type={showpassword ? "text":"password"} className='w-full pl-10 pr-4 border border-gray-300 p-3 rounded-xl focus:outline-[#0075A8]' placeholder='Enter your password...'></input>
            <span 
            onClick={()=>setShowpassword(!showpassword)} className='absolute right-3 top-1/3 cursor-pointer text-sm text-gray-500'>
              {showpassword ? <EyeOff size={20} /> : <Eye size={20}/>}
              </span>
            </div>
            <div className="relative">
            <button  onClick={sendrequest} className='w-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:gap-4 transition-all duration-300'>Register
              <ArrowRight className='top-6 w-4 h-4 right-29 text-white 'size={18}/>
            </button>
            </div>

            <p className='text-[12px] text-center mt-4 font-semibold'>already have an account? <Link to="/" className="text-blue-500 hover:underline">
    Sign in 
  </Link></p>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Register