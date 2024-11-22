import React, {useEffect, useContext, useState} from 'react'
import { useParams } from 'react-router-dom';
import { MainContext } from '../../context/context';
import Axios from 'axios';
import DriverVehicles from './DriverVehicles';
const VehiclesDetails = () => {
  const {vehicless} = useParams();
  const {baseUrl, token} = useContext(MainContext);
  const [rawDriver, setRawDriver] = useState(null)
  const [driver, setDriver] = useState(null)
  const fetchVechleDetails = async () => 
  {
    try {
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}vendor-driver/vehicle-by-driver?driverId=${vehicless}`,
        headers: {
          "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
  
        }
  
      })
      console.log(response.data)
      setRawDriver(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchVechleDetails()
  }, [])

  useEffect(()=>{
    setDriver(rawDriver)
  }, [rawDriver])
  return (
    <div>
      {driver && <DriverVehicles data = {driver}/>}
    </div>
  )
}

export default VehiclesDetails