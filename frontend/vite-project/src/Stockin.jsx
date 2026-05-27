import React from 'react'
import { Plus,X } from 'lucide-react'
import { useState } from 'react'
import { useEffect } from 'react'

function Stockin() {
  const [stockin,setStockin] = useState([])
  const [sparepart,setSparepart] = useState([])
  const [stockinquantity,setStockinquantity] = useState("")
  const [sparepartid,setSparepartid] = useState("")
  const [stockindate,setStockindate] = useState("")
  const [ismodel,setIsModel] = useState(false)

  //function to handle post for stockin
  const sendrequest = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    try {
      const res = await fetch("http://localhost:3000/api/stockins",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
          stockinquantity,
          sparepartid,
          stockindate
        })
      })
      const data = await res.json()
      console.log(data)
      filter()

      //clears the form
      setStockinquantity("")
      setSparepartid("")
      setStockindate("")
    } catch (error) {
      console.error(error.message)
    }
    
  }
  //function to retrieve on the stockin form
  const filter = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("http://localhost:3000/api/stockins",{
        method:"GET",
        headers:{
        "Authorization":`Bearer ${token}`
        }
      })
      const data = await res.json()
      setStockin(data.stockins)
      console.log(data.stockins)
    } catch (error) {
      console.error(error.message)
    }
    
  }
  //function to retrieve on the sparepart
   const handlefetch = async () => {
          const token = localStorage.getItem("token")
          try {
              const res = await fetch("http://localhost:3000/api/spareparts",{
                  method:"GET",
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
  useEffect(()=>{
    filter()
    handlefetch()
  },[])
  return (
    <div className="bg-white h-screen font-sans w-full flex flex-col p-4">
      <div className="mt-4 flex justify-between border-b border-gray-300">
        <div className="mb-3">
        <h1 className="font-bold text-[20px] text-slate-900">stockin log registry</h1>
        <p className="text-xs text-gray-600 mt-1">manage the incoming product or their logs</p>
        </div>
        <div className="relative">
          <Plus className="absolute left-2 top-2 text-white" size={16}/>
          <button onClick={()=>setIsModel(true)}
          className="bg-blue-700 text-white px-6 py-1 rounded-2xl text-[15px] pl-7">add item
            
          </button>
        </div>
      </div>
      <div className="mt-6">
        <table className="w-full bg-white">
          <thead className="bg-gray-100">
            <th className="p-2 text-gray-600">quantity</th>
            <th className="p-2 text-gray-600">sparpart item</th>
            <th className="p-2 text-gray-600">stockin date</th>
          </thead>
          <tbody className="">
            {stockin.map((sta)=>(
              <tr key={sta._id} className="border-b border-gray-300 hover:bg-gray-100">
                <td className="p-2 text-center">{sta.stockinquantity}</td>
                <td className="p-2 text-center">{sta.sparepartid?.name}</td>
                <td className="p-2 text-center">{sta.stockindate ? new Date(sta.stockindate).toLocaleDateString():"N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*model*/}
      {ismodel &&(
        <div className="fixed inset-0 bg-slate-900/50 backdrop:blur-xs flex items-center justify-center">
          <div className="w-[400px] bg-white p-6 rounded-2xl relative">
            <button className="absolute right-4 top-4 text-gray-400 hover:bg-gray-100"
            onClick={()=>setIsModel(false)}>
              <X size={18}/>
            </button>
            <h1 className="text-lg font-bold text-slate-900 mb-4">stockin regisrty</h1>
            <form
            className="flex flex-col gap-3">
              <label className="block text-gray-600 font-semibold mb-1 text-xs">select spare part item</label>
              <select 
              value={sparepartid}
              onChange={(e)=>setSparepartid(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-xl text-sm bg-gray-50 focus:outline-blue-500">
                <option value="">select item</option>
                {sparepart.map((spa)=>(
                  <option key={spa._id} value={spa._id}>
                  <option className="">{spa.name}</option>
            </option>
              

                ))}
              </select>
              <label className="block text-gray-600 font-semibold mb-1 text-xs">Incoming Quantity Units</label>
                <input 
                  type="number"
                  min="1"
                  value={stockinquantity}
                  onChange={(e) => setStockinquantity(e.target.value)}
                  placeholder="e.g. 50"
                  required
                  className="w-full p-2 border border-gray-300 rounded-xl text-sm focus:outline-blue-500" 
                />
                  <label className="block text-gray-600 font-semibold mb-1 text-xs">stockin date</label>
                <input 
                  type="date"
                  value={stockindate}
                  onChange={(e) => setStockindate(e.target.value)}
                  placeholder=""
                  required
                  className="w-full p-2 border border-gray-300 rounded-xl text-sm focus:outline-blue-500" 
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={()=>setIsModel(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50">cancel</button>
                  <button onClick={sendrequest}
                  className="px-4 py-2 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800">confirm delivery</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stockin