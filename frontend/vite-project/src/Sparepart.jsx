import React from 'react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import {motion,AnimatePresence} from 'framer-motion'

function Sparepart() {
  const [sparepart,setSparepart] = useState([])
  const [name,setName] = useState("")
  const [category,setCategory] = useState("")
  const [quantity,setQuantity] = useState("")
  const [unitprice,setUnitprice] = useState("")
  const [totalprice,setTotalprice] = useState("")
  const [isModel,setIsModel] = useState(false)

  //function to handle sparepart post
  const sendrequest = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("http://localhost:3000/api/spareparts",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
          name,
          category,
          quantity,
          unitprice,
          totalprice
        })
      })
      const data = await res.json()
      console.log(data)
      filter()

      //clears the form
      setName("")
      setCategory("")
      setQuantity("")
      setUnitprice("")
      setTotalprice("")
    } catch (error) {
      console.error(error.message)
    }
    
  }

  //function to retrieve on the sparepart collection
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

      //download excel file
      const downloadExcel = async () => {

  const token = localStorage.getItem("token");

  try {

    const res = await fetch(
      "http://localhost:3000/api/spareparts/export/excel",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // convert response into file
    const blob = await res.blob();

    // create file url
    const url = window.URL.createObjectURL(blob);

    // create temporary link
    const link = document.createElement("a");

    link.href = url;

    // filename
    link.download = "spareparts.xlsx";

    // click link automatically
    link.click();

  } catch (error) {

    console.error(error);

  }

};
      useEffect(()=>{
        filter()
      },[])
  return (
    <div className="bg-white font-sans h-screen flex flex-col p-4 relative ">
      <div className="mt-4 p-2 justify-between flex border-b border-gray-300">
        <div className="">
        <h1 className="font-bold text-slate-900 text-[20px]">sparepart registry</h1>
        <p className="mt-1 text-xs text-gray-600">Manage your item with it's core price</p>
        </div>
        <div className="flex gap-2">
           <button
    onClick={downloadExcel}
    className="h-[31px] px-4  bg-green-700 text-white rounded-2xl text-[15px]"
  >
    Export Excel
  </button>
        <div className="relative">
        <div className="">
          <Plus className="absolute left-2 top-2 text-white"size={16}/>
          <button onClick={()=>setIsModel(true)}
          className="px-4 py-1 bg-blue-700 text-white rounded-2xl text-[15px] pl-7">add record</button>
        </div>
        </div>
        </div>
      </div>
       
       {/*table display*/}
       <div className="mt-6">
        <table className="w-full bg-white p-2">
          <thead className="bg-gray-100 text-gray-600">
            <th className="p-2">Name</th>
            <th className="p-2">category</th>
            <th className="p-2">quantity</th>
            <th className="p-2">unitprice</th>
            <th className="p-2">totalprice</th>

          </thead>
          <tbody className="">
            {sparepart.map((spa)=>(
                <tr key={spa._id} className='hover:bg-gray-50 border-gray-300 border-b'>
                  <td className='p-3 text-center'>{spa.name}</td>
                  <td className='p-3 text-center'>{spa.category}</td>
                  <td className='p-3 text-center'>{spa.quantity}</td>
                  <td className='p-3 text-center'>{spa.unitprice}</td>
                  <td className='p-3 text-center'>{spa.totalprice}</td>
                </tr>
              ))}
          </tbody>
        </table>
       </div>
       <AnimatePresence>
       {isModel &&(
        <motion.div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center"
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        >
          <motion.div className="w-[400px] bg-white rounded-2xl p-6 border border-gray-200 relative"
          initial={{scale:0.8 , y:50 , opacity:0}}
          animate={{scale:1 , y:0 , opacity:1}}
          exit={{scale:0.8 , y:50 , opacity:0}}
          >
            <button onClick={()=>setIsModel(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
               <X size={18}/>
            </button>
            <h1 className="text-lg font-bold text-slate-900 mb-4">new sparepart</h1>
            <form onSubmit={sendrequest} className="flex flex-col gap-3">
              <label className="block text-gray-600 font-semibold mb-1 text-xs">Name</label>
              <input type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="e.g. Brake Pads"
              required
              className="w-full p-2 border border-gray-300 rounded-xl text-sm focus:outline-blue-500"></input>
              <div>

               <label className="block text-gray-600 font-semibold mb-1 text-xs">category</label>
              <input type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              placeholder="e.g. engine,mechanical"
              required
              className="w-full p-2 border border-gray-300 rounded-xl text-sm focus:outline-blue-500"></input>

               <label className="block text-gray-600 font-semibold mb-1 text-xs">Qantity</label>
              <input type="text"
              value={quantity}
              onChange={(e)=>setQuantity(e.target.value)}
              placeholder="e.g. 2"
              required
              className="w-full p-2 border border-gray-300 rounded-xl text-sm focus:outline-blue-500"></input>
              </div>
                 <label className="block text-gray-600 font-semibold mb-1 text-xs">unit price</label>
              <input type="text"
              value={unitprice}
              onChange={(e)=>setUnitprice(e.target.value)}
              placeholder="e.g. Brake Pads"
              required
              className=" w-full p-2 border border-gray-300 rounded-xl text-sm focus:outline-blue-500"></input>
              

                
              
              <div className="flex gap-2 justify-end mt-4"><motion.button 
    type="button"
    onClick={() => setIsModel(false)}
    className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
    whileHover={{scale:1.05}}
    whileTap={{scale:0.95}}
  >
    Cancel
  </motion.button>
  <button 
    type="submit"
    className="px-4 py-2 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800"
  >
    Save Item
  </button>
                 
                
              </div>
            </form>
            </motion.div>
          </motion.div>
    
       )}
       </AnimatePresence>
    


    </div>
  )
}

export default Sparepart