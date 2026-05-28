import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate,NavLink } from 'react-router-dom'
import { LayoutDashboard,PackagePlus,Wrench,PackageMinus, User,LogOut,Menu} from 'lucide-react'
import {motion} from 'framer-motion'

function Dashboard() {
    const [Sparepart,setSparepart] = useState([])
    const [user,setUser] = useState(null)
    const [sidebaropen,setSidebaropen] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        const exist = JSON.parse(localStorage.getItem("user"))
        setUser(exist)
    },[])
    //function to logout
    const logout = ()=>{
      localStorage.clear();
      setUser(null)
      navigate("/"); 
      return;
    }
    const LinkClass = ({isActive})=>
        `flex gap-3 px-4 py-2 items-center rounded-xl transition-all duration-300 ${isActive
        ?"bg-white text-slate-900 font-semibold shadow":"text-white hover:bg-white/10"
        }`
  return (
    <>
    <div className='w-full min-h-screen flex  bg-white font-sans'>
        <motion.aside className="w-[260px] h-screen flex flex-col bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900"
        animate={{
            width:sidebaropen ? 240:0,
            opacity:sidebaropen ? 1:0

        }}
        transition = {{type:"string",stiffness:300,dumping:30}}
        >
            <div className="p-4 border-b border-white">
                <h1 className="text-2xl font-bold text-white mb-2">Smart Park</h1>
                <p className='text-blue-200 text-[13px]'>manage your smart parking system</p>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <nav className='space-y-6 mb-6'>
                    
                    <NavLink to="/dashboard" className={LinkClass}>
                    <LayoutDashboard size={18}/>
                    dashboard
                    </NavLink>
                    
                        
                    <NavLink to="/dashboard/sparepart" className={LinkClass}>
                    <Wrench size={18}/>
                    Sparepart</NavLink>
                    
                    
                        
                    <NavLink to="/dashboard/stockin" className={LinkClass}>
                    <PackagePlus size={18}/>
                    Stockin</NavLink>
                    
                    
                        
                    <NavLink to="/dashboard/stockout" className={LinkClass}>
                    <PackageMinus size={18}/>
                    Stockout</NavLink>
                    
                </nav>
                <div className="mt-auto border-t border-white pt-4">
                    
                <div className="relative">
                    <LogOut className='absolute top-3.5 left-12 text-white'size={15}/>
                    <button onClick={logout} className='w-full bg-red-500/20 hover:bg-red-600/50 text-white p-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-2'>logout</button>
                </div>
                </div>
            </div>
        </motion.aside>
          <div className="flex flex-col w-full h-screen overflow-y-auto">
           <header className="w-full">
            <div className="bg-gray-100 shadow-sm p-3 flex justify-between">
                <div className="flex gap-4 relative">
                <Menu onClick={()=>setSidebaropen(!sidebaropen)}
                className="absolute left-2 top-2"size={20}/>
        <h1 className='text-black font-bold text-2xl pl-8'> welcome back👍</h1>
        </div>
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-1.5 rounded-full border border-gray-100">
            <div className="text-right">
        <h1 className='text-[13px] font-semibold text-gray-700'>{user?.name}</h1>
        <p className='text-[10px] font-medium text-emerald-600'>active account</p>
        </div>
        
        <User className='items-center justify-center flex w-3px h-3px pl-2 font-bold'size={32}/>
        </div>
        </div>
    </header>
    <main className='flex bg-white flex-col'>
        <Outlet/>
    </main>
        

    </div>
    </div>
 
    
    </>
  )
}

export default Dashboard