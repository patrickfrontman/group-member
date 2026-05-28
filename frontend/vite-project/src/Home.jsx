import React, { useState,useEffect } from 'react'
import { Wrench,HardDrive,PackageMinus } from 'lucide-react'

function Home() {
      const [Sparepart,setSparepart] = useState([])
      const [stockin,setStockin] = useState([])
      const [stockout,setStockout] = useState([])
      //funnction to fetch in the spare-part
      const filter = async () => {
          const token = localStorage.getItem("token")
          try {
              const res = await fetch("http://localhost:3000/api/spareparts",{
                  method:"get",
                  headers:{
                      "Content-Type":"application/json",
                      "Authorization":`Bearer ${token}`
                  }
              })
      const data = await res.json()
      setSparepart(data.spareparts)
      console.log(data.spareparts)
          } catch (error) {
              console.error(error.message)
          }
          
      }
      //function to retrieve the data in stockin
      const handlefetch = async () => {
        const token = localStorage.getItem("token")
        try {
          const res = await fetch("http://localhost:3000/api/stockins",{
            method:"GET",
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
          const data = await res.json()
          setStockin(data.stockins)
          console.log(data.stockins)
        } catch (error) {
          console.error(error.message)
          
        }
        
      }
      //function to retrieve on the stockout db
      const fetchstockout = async () => {
        const token  = localStorage.getItem("token")
        try {
          const res = await fetch("http://localhost:3000/api/stockouts",{
            method:"GET",
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
          const data = await res.json()
          setStockout(data.stockouts)
          console.log(data.stockouts)
        } catch (error) {
          console.error(error.message)
        }
        
      }
      useEffect(()=>{
        filter()
        handlefetch()
        fetchstockout()
      },[])
  return (
    <div className='font-sans w-full min-h-screen flex flex-col p-6 bg-gray-50'>
        
      
        <div className='mb-6'>
            <h1 className='text-xl font-bold'>manage your system</h1>
            <p className='text-xs mt-1 text-gray-600'>Select an option from the sidebar to get started.</p>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div className="relative">
            
          <div className="bg-gray-100 border max-w-[320px] h-[140px] rounded-xl border-gray-300 p-4 hover:scale-105 duration-500 transition-all">
            <Wrench className='absolute right-6 top-3 bg-white shadow-lg rounded-xl w-10 h-10 text-emerald-600 p-2'size={20}/>
            <h2 className="text-lg font-bold mb-2 text-emerald-600">sparepart record</h2>
            <p className="text-4xl font-bold text-black">{Sparepart.length}</p>
            <p className="text-[11px] text-gray-400 mt-1">Unique items registered</p>
          </div>
          </div>
          <div className="relative">
          <div className="bg-gray-100 border w-[320px] h-[140px] rounded-xl border-gray-300 p-4 hover:scale-105 duration-500 transition-all">
            <h2 className="text-lg font-bold text-blue-700 mb-2">Total stock unit</h2>
            <HardDrive className='absolute top-3 right-5 text-blue-500 bg-white rounded-xl w-10 h-10 p-2 'size={20}/>
            <p className=" text-slate-900 text-4xl font-bold">{stockin.length}</p>
            <p className='text-[11px] text-gray-400 mt-1'>items currently inside inventory</p>
          </div>
          </div>
          <div className="relative">
          <div className="bg-gray-100 border w-[320px] h-[140px] rounded-xl border-gray-300 p-4 hover:scale-105 duration-500 transition-all">
            <h2 className="text-lg font-bold text-amber-600 mb-2">Total stock out</h2>
            <PackageMinus className='absolute top-3 right-5 text-amber-600 bg-white rounded-xl w-10 h-10 p-2 'size={20}/>
            <p className=" text-slate-900 text-4xl font-bold">{stockout.length}</p>
            <p className='text-[11px] text-gray-400 mt-1'>items currently outside inventory</p>
          </div>
          </div>

        </div>
        <div className="flex gap-2 mt-8">
          <div className="w-[500px] h-[400px] ">
          <table className='w-full bg-gray-50 border border-gray-200'>
            <thead className='bg-gray-100 p-2 '>
              <th className='p-2'>name</th>
              <th className='p-2'>category</th>
              <th className='p-2'>quantity</th>
              <th className='p-2'>unitprice</th>
              <th className='p-2'>totalprice</th>
            </thead>
            <tbody className=''>
              {Sparepart.map((spa)=>(
                <tr key={spa._id} className='hover:bg-gray-50 border-gray-400 border-b'>
                  <td className='p-3'>{spa.name}</td>
                  <td className='p-3'>{spa.category}</td>
                  <td className='p-3 text-center'>{spa.quantity}</td>
                  <td className='p-3 text-center'>{spa.unitprice}</td>
                  <td className=' p-3 text-center'>{spa.totalprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          </div>
             <div className="w-[500px] h-[450px]">
          <table className='w-full bg-gray-50 border-gray-200 border'>
            <thead className='bg-gray-100 p-2 '>
              <th className='p-2'>stockin quantity</th>
              <th className='p-2'>sparepart </th>
              <th className='p-2'>stock in date</th>
            </thead>
            <tbody className=''>
              {stockin.map((sta)=>(
                <tr key={sta._id} className='hover:bg-gray-50 border-gray-400 border-b'>
                  <td className='p-3 text-center'>{sta.stockinquantity}</td>
                  <td className='p-3 text-center'>{sta.sparepartid?.name}</td>
                  <td className='p-3 text-center'>{sta.stockindate ? new Date(sta.stockindate).toLocaleDateString():"N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          </div>
        </div>

    </div>
  )
}

export default Home
