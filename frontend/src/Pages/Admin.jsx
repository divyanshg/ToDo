import React, {useEffect, useState} from 'react'
import jwt from "jwt-decode";
import NavBar from '../Components/Admin/NavBar';
import getAdminData from '../api/getAdminData'
import Metric from '../Components/Admin/Metric';
import Task from '../Components/Task';
import TaskAccordian from '../Components/Admin/TaskAccordian';

function Admin() {

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    (async() => {
        let token = await localStorage.getItem('token')
        let user = jwt(token) 
        if(!user.isAdmin || user.isUser){
            return window.location.href = '/'
        }
        setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    (async() => {
        let data = await getAdminData()
        setData(data)
    })()
  }, [!isLoading])

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <NavBar />
      <div className="flex flex-row w-full justify-between space-x-4 px-4 mt-8">
        <Metric value={data?.totalEntriesInLast7Days} title="Last 7 Days" />
        <Metric value={data?.totalEntriesAWeekBefore} title="Week before" />
        <Metric
          value={data?.averageTasksByEachUserAverage}
          title="Average Tasks By Users"
        />
      </div>
      <div className="px-4 mt-8">
        <h2 className="text-4xl font-bold mb-4">Tasks</h2>
        <div className="bg-white p-3 shadow-sm rounded-lg">
          <div className="w-1/3">
            <TaskAccordian data={data?.tasksByEachUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin