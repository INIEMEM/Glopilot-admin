import React, {useEffect, useState, useContext} from 'react'
import { MainContext } from '../../context/context'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import VehicleDetailsPage from './VehicleDetailsPage';
const VehicleSyncDriver =  () => {
  const {baseUrl, token} = useContext(MainContext);
  const {vehicleSyncd} = useParams();
  const [vehicle, setVehicle] = useState({});
  const [vehicleRawData, setVehicleRawData] = useState({});
    const fetchVehicles = async () => {
      try {
        const resposne = await Axios({
          method:'get',
          url: `${baseUrl}vendor-driver/vehicle-sync-details?driverId=${vehicleSyncd}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
          
        })

        // console.log(resposne.data)
        setVehicleRawData(resposne.data);
      } catch (error) {
        console.error('ftech error', error);
      }
    }

    useEffect(()=>{
      fetchVehicles()
    }, [])
    useEffect(()=>{
      setVehicle(vehicleRawData);
      
    }, [vehicleRawData])
  
  return (
    <div>
        {vehicle !== null && <VehicleDetailsPage data ={vehicle}/>}
    </div>
  )
}

export default VehicleSyncDriver