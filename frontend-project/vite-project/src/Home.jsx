import React, { useState,useEffect } from 'react'
import { Wrench,HardDrive,PackageMinus } from 'lucide-react'

function Home() {
      const [department,setDepartment] = useState([])
      const [employee,setEmployee] = useState([])
      const [salary,setSalary] = useState([])
      //funnction to fetch in the department
      const filter = async () => {
          const token = localStorage.getItem("token")
          try {
              const res = await fetch("http://localhost:5000/departments",{
                  method:"get",
                  headers:{
                      "Content-Type":"application/json",
                      "Authorization":`Bearer ${token}`
                  }
              })
      const data = await res.json()
      setDepartment(data.departments)
      console.log(data.departments)
          } catch (error) {
              console.error(error.message)
          }
          
      }
      //function to retrieve the data in employee
      const handlefetch = async () => {
        const token = localStorage.getItem("token")
        try {
          const res = await fetch("http://localhost:5000/employees",{
            method:"GET",
            headers:{
              "Authorization": `Bearer ${token}`
            }
          })
          const data = await res.json()
          setEmployee(data.employees)
          console.log(data.employees)
        } catch (error) {
          console.error(error.message)
          
        }
        
      }
      //function to retrieve on the stockout db
      const fetchstockout = async () => {
        const token  = localStorage.getItem("token")
        try {
          const res = await fetch("http://localhost:5000/salaries",{
            method:"GET",
            headers:{
              "Authorization":`Bearer ${token}`
            }
          })
          const data = await res.json()
          setSalary(data.salaries)
          console.log(data.salaries)
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
            <h2 className="text-lg font-bold mb-2 text-emerald-600">Department record</h2>
            <p className="text-4xl font-bold text-black">{department.length}</p>
            <p className="text-[11px] text-gray-400 mt-1">department occured</p>
          </div>
          </div>
          <div className="relative">
          <div className="bg-gray-100 border w-[320px] h-[140px] rounded-xl border-gray-300 p-4 hover:scale-105 duration-500 transition-all">
            <h2 className="text-lg font-bold text-blue-700 mb-2">employee record</h2>
            <HardDrive className='absolute top-3 right-2 text-blue-500 bg-white rounded-xl w-10 h-10 p-2 'size={20}/>
            <p className=" text-slate-900 text-4xl font-bold">{employee.length}</p>
            <p className='text-[11px] text-gray-400 mt-1'>employee currently published</p>
          </div>
          </div>
          <div className="relative">
          <div className="bg-gray-100 border w-[320px] h-[140px] rounded-xl border-gray-300 p-4 hover:scale-105 duration-500 transition-all">
            <h2 className="text-lg font-bold text-amber-600 mb-2">salary record</h2>
            <PackageMinus className='absolute top-3 right-2 text-amber-600 bg-white rounded-xl w-10 h-10 p-2 'size={20}/>
            <p className=" text-slate-900 text-4xl font-bold">{salary.length}</p>
            <p className='text-[11px] text-gray-400 mt-1'>salaries published</p>
          </div>
          </div>

        </div>
       
           <div className="mt-6">
  <table className='w-full bg-gray-50 border-gray-100 border'>
    <thead className='bg-gray-100'>
      <tr>
        <th className='p-2'>Employee No</th>
        <th className='p-2'>Name</th>
        <th className='p-2'>Position</th>
        <th className='p-2'>Department</th>
        <th className='p-2'>Phone</th>
        <th className='p-2'>Hire Date</th>
      </tr>
    </thead>

    <tbody>
      {employee.map((emp) => (
        <tr key={emp._id} className='border-b border-gray-200 hover:bg-gray-50'>
          <td className='p-3 text-center'>{emp.employeenumber}</td>

          <td className='p-3 text-center'>
            {emp.firstname} {emp.lastname}
          </td>

          <td className='p-3 text-center'>{emp.position}</td>

          <td className='p-3 text-center'>
            {emp.department?.departmentName || "N/A"}
          </td>

          <td className='p-3 text-center'>{emp.telephone}</td>

          <td className='p-3 text-center'>
            {emp.hireddate
              ? new Date(emp.hireddate).toLocaleDateString()
              : "N/A"}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </div>

  )
}

export default Home
