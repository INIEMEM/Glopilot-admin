import React, {useContext, useEffect, useState} from 'react';
import Axios from 'axios';
import { MainContext } from '../../context/context';
const DeliveryPices = () => {
  const [deliveryPrices, setDeliveryPrices] = useState([]);
  const { baseUrl, token} = useContext(MainContext);
  const fetchDeliveryPrices = async() =>
    {
      try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-food/admin-delivery-price`,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Accept": "*/*",
          }
        });

        console.log(response.data);
      } catch (error) {
        console.error('fetch error >>>', error);
      }
    }

    useEffect(()=>{
      fetchDeliveryPrices()
    }, [])
  return (
    <div>DeliveryPices</div>
  )
}

export default DeliveryPices