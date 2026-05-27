import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, User,EyeOff,Eye} from 'lucide-react';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword,setShowpassword]= useState(false)

  const sendrequest = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        return alert(data.message);
      }
      const token = data.token
      const user = data.user
      
      localStorage.setItem("token",token);
      localStorage.setItem("user",JSON.stringify(user))
      navigate("/Dashboard");

      console.log(data)
      //clears the form
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    // 1. Full Screen Center Container
    <div className="w-full h-screen flex items-center justify-center p-4">
      
      {/* 2. Main Combined Card*/}
      <div className="flex flex-col bg-white md:flex-row shadow-lg rounded-2xl max-w-4xl w-full">
        
        {/* LEFT SIDE: Welcome/Create Account Panel */}
        <div className="w-1/2 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 p-12 flex flex-col justify-center items-center text-white text-center rounded-r-full">
        <h1 className='font-bold text-white text-4xl mb-4'>Welcome Back</h1>
          <p className="mb-8 text-white ">
            Don't have an account yet? Join us and start your journey today.
          </p>
          <button 
            onClick={() => navigate("/register")} 
            className=" bg-white px-8 py-2 rounded-2xl  cursor-pointer hover:px-10  transition-all duration-500 font-semibold text-[#0075A8]"
          >
            Create Account →
          </button>
        </div>

        {/* RIGHT SIDE: Your Login Form */}
        <div className="w-1/2 p-12 shadow-r-lg">
          <form onSubmit={sendrequest}>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-emerald-500 to-indigo-500 bg-clip-text">Login Form</h1>
            <p className='text-gray-500 text-sm mt-1 mb-8'>Enter your credentials to continue</p>
            
            <div className="mb-4">
              <label className="block mb-1 text-gray-600 font-medium">Email:</label>
              <div className="relative">
              <User className='absolute top-3 w-5 h-6 text-gray-400 left-2' size={20}/>
              <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" 
                className="w-full border pl-9 pr-4 border-gray-300 p-3 rounded-xl focus:outline-[#0075A8]" 
                placeholder="Enter your email..." 
                required
              />
            </div>
            </div>

            <div className="mb-6 relative">
  <label className="block mb-1 text-gray-600 font-medium">Password:</label>
  <LockKeyhole className='absolute top-1/2 w-5 h-6 left-2 text-gray-400' size={20}/>
  <input 
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    type={showpassword ? "text" : "password"}
    className="w-full border border-gray-300 pl-9 pr-4 p-3 rounded-xl focus:outline-[#0075A8]" 
    placeholder="Enter your password..." 
    required
  />

  <span
    onClick={() => setShowpassword(!showpassword)}
    className="absolute right-3 top-10 cursor-pointer text-sm text-gray-500"
  >
    {showpassword ? <EyeOff size={20} /> : <Eye size={20}/>}
  </span>
</div>

            <button className="w-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-800 text-white px-8 py-2 rounded-xl font-bold hover:scale-105 cursor-pointer  transition-all duration-500">
              LOGIN →
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
