import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios';
import { MainContext } from '../../context/context';
import DriversTable from './DriversTable';

const AllDrivers = () => {
  const { baseUrl, token } = useContext(MainContext);
  const [drivers, setDrivers] = useState([])
 const fetchDriverList = async () =>
  {
    const response = await Axios({
      method: 'get',
      url: `${baseUrl}vendor-driver/drivers`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

    });

    console.log(response.data?.data?.data);
    setDrivers(response.data)
  } 

  useEffect(()=>{
    fetchDriverList()
  }, [])
  return (
    <div>
      <DriversTable driversData ={drivers}/>
    </div>
  )
}

export default AllDrivers