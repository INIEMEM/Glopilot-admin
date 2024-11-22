import React, { useContext, useState, useEffect } from "react";
import { Table, Avatar, Button, Typography, message } from "antd";
import Axios from "axios";
import VehiclesTable from "./VehiclesTable";
import { MainContext } from "../../context/context";
import './allVehicles.css'
const { Title } = Typography;

const Allvehicles = () => {
  const {baseUrl, token} = useContext(MainContext);
  const [rawVehicles, setRawVehicles] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const fetchVehicles = async () => {
    try {
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}vendor-driver/vehicles-admin`,
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      console.log(response.data);
      setRawVehicles(response.data)
    } catch (error) {
      console.error('the fetch vehicles', error);
    }
    
  }

  useEffect(()=> {
    fetchVehicles();

  }, [])
  useEffect(()=> {
    
    setVehicles(rawVehicles)
  }, [rawVehicles])
  return (
    <div>
      {vehicles && <VehiclesTable vehiclesData = {vehicles}/>}
    </div>
  )
}

export default Allvehicles