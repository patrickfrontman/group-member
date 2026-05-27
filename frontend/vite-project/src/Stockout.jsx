import React from 'react'
import { Edit2Icon, Edit3, Form, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'
import {X} from 'lucide-react'

function Stockout() {
  const [stockoutquantity,setStockoutquantity] = useState("")
  const [sparepartid,setSparepartid] = useState("")
  const [stockoutunitprice,setStockoutunitprice] = useState("")
  const [stockouttotalprice,setStockouttotalprice] = useState("")
  const [stockoutDate,setStockoutDate] = useState("")
  const [stockout,setStockout] = useState([])
  const [isModel,setIsModel] = useState(false)
  const [sparePart,setSparePart] = useState([])
  const [selectedid,setSelectedid] = useState(null)
  const [updatemode,setUpdatemode] = useState(false)

  const getdata = (sta)=>{
  setSelectedid(sta._id)
  setStockoutquantity(sta.stockoutquantity)
  setSparepartid(sta.sparepartid?._id)
  setStockoutunitprice(sta.stockoutunitprice)
  setStockouttotalprice(sta.stockouttotalprice)
  setStockoutDate(sta.stockoutDate)
  setUpdatemode(true)
  };

  //function to handle stockout update
  const handleupdate = async (id) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`http://localhost:3000/api/stockouts/${selectedid}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
          stockoutquantity,
          sparepartid,
          stockoutunitprice,
          stockouttotalprice,
          stockoutDate
        })
      })
      const data = await res.json()
      console.log(data)
      filter()

      //refresh the form
      setStockoutquantity("")
      setSparepartid("")
      setStockoutunitprice("")
      setStockouttotalprice("")
      setStockoutDate("")
      setSelectedid(null)
      setUpdatemode(false)

    } catch (error) {
      console.error(error.message)
    }
    
  }
  //function to handle deletion of the sstockout item
  const handledelete = async (id) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`http://localhost:3000/api/stockouts/${id}`,{
        method:"DELETE",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
      const data = await res.json()
      console.log(data)
      filter()
    } catch (error) {
      console.error(error.message)
    }
    
  }

  //function to handle post for stockout
  const sendrequest = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("http://localhost:3000/api/stockouts",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
          stockoutquantity,
          sparepartid,
          stockoutunitprice,
          stockouttotalprice,
          stockoutDate
        })
      })

      const data = await res.json()
      console.log(data)
      filter()

        //clears the form
        setStockoutquantity("")
        setSparepartid("")
        setStockoutunitprice("")
        setStockouttotalprice("")
        setStockoutDate("")
    } catch (error) {
      console.error(error.message)
    }
    
  }

  //function to handle retrieve in stockout
  const filter = async () => {
    const token = localStorage.getItem("token")
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

   //function to retrieve on the sparepart collection
  const handlefetch = async () => {
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
      setSparePart(data.spareparts)
      console.log(data.spareparts)
          } catch (error) {
              console.error(error.message)
          }
          
      }

  useEffect(()=>{
    const total = stockoutquantity * stockoutunitprice;
    setStockouttotalprice(total);
    filter()
    handlefetch()
  },[stockoutquantity, stockoutunitprice])
  return (
    <div className="bg-white w-full h-screen font-sans p-4">
      <div className="flex justify-between border-b border-gray-300">
        <div className="mb-3">
        <h1 className="text-slate-900 text-[20px] font-bold">stockout log Registry</h1>
        <p className="text-gray-600 mt-1 text-xs">manage your stockout items easily and daily audit.</p>
        </div>
         <div className="relative">
        <Plus className="absolute left-2 top-2.5 text-white"size={16}/>
        <button onClick={()=>setIsModel(true)} 
        className="bg-blue-700 text-white px-4 py-1 rounded-2xl pl-7">add record</button>
      </div>
      </div>
      <div className="mt-6">
        <table className="w-full bg-white p-2">
        <thead className="bg-gray-100 text-gray-500">
          <th className="p-2">quantity</th>
          <th className="p-2">sparepart item</th>
          <th className="p-2">unit price</th>
          <th className="p-2">total price</th>
          <th className="p-2">stockout date</th>
          <th className="p-2">action</th>
          
        </thead>
        <tbody className="">
          {stockout.map((sta)=>(
            <tr key={sta._id} className="border-b border-gray-50 hover:bg-gray-50">
              <td className="text-center p-2">{sta.stockoutquantity}</td>
              <td className="text-center p-2">{sta.sparepartid?.name}</td>
              <td className="text-center p-2">{sta.stockoutunitprice}</td>
              <td className="text-center p-2">{sta.stockouttotalprice}</td>
              <td className="text-center p-2">{sta.stockoutDate ? new Date(sta.stockoutDate).toLocaleDateString():"N/A"}</td>
              <td className="text-center p-2">
                <div className="flex gap-2 text-center justify-center">
                <button 
                  onClick={() => {
    getdata(sta)
    setIsModel(true)
  }} 
                className='px-4 py-1  text-xs rounded-xl text-gray-500'><Edit3 size={18}/></button>
                 <button onClick={()=>handledelete(sta._id)}
                 className="px-2 py-1 text-gray-500 rounded-xl hover:shadow-lg transition-all duration-200 ease-in-out font-medium"><Trash2 size={18}/></button>
                 </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      {/*set model open */}
      {isModel &&(
        <div className="fixed inset-0 bg-slate-900/50 backdrop:blur-xs flex items-center justify-center">
          <div className="w-[400px] bg-white rounded-2xl p-6 border border-gray-100 relative">
            <button onClick={()=>setIsModel(false)} 
            className="absolute right-4 top-4 text-gray-400">
              <X size={18}/>
            </button>
            <form onSubmit={updatemode ? handleupdate : sendrequest}
            className="flex flex-col gap-3 mb-4">
              <h1 className="text-lg font-bold text-slate-900 mb-4">stockout registry</h1>

              <label className="block text-gray-600 font-semibold mb-1 text-xs">quantity</label>
              <input type="number"
              value={stockoutquantity}
              onChange={(e)=>setStockoutquantity(e.target.value)}
              placeholder="e.g. 50"
              className="w-full border border-gray-200 rounded-xl text-xs focus:outline-blue-500 py-3 p-2 "></input>

              <label className="block text-gray-600 font-semibold mb-1 text-xs">sparepart item</label>
              <select
              value={sparepartid}
              onChange={(e)=>setSparepartid(e.target.value)}
              required
              className="w-full border border-gray-200 py-3 focus:outline-blue-500 text-xs p-2 rounded-xl">
                <option value="">select item</option>
                {sparePart.map((spa)=>(
                  <option key={spa._id} value={spa._id}>{spa.name}</option>
                ))}
              </select>

                <label className="block text-gray-600 font-semibold mb-1 text-xs">unit price</label>
              <input type="number"
              value={stockoutunitprice}
              onChange={(e)=>setStockoutunitprice(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full border border-gray-200 rounded-xl text-xs focus:outline-blue-500 py-3 p-2 mb-3 "></input>

              <div className="flex gap-2 justify-end">
                 
  <button
    type="button"
    onClick={() =>setIsModel(false)}
    className="mt-2 bg-white text-gray-600 py-2 px-4 border border-gray-300 rounded-2xl"
  >
    cancel
  </button>
                <button onClick={updatemode ? "update record" : "send record"}
                className="mt-2 bg-blue-700  text-white py-2 px-4 border rounded-2xl">send record</button>
              </div>

            </form>
          </div>
        </div>
      )}     
    </div>
  )
}

export default Stockout