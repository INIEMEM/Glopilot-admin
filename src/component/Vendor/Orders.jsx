import { useContext, useState, useEffect } from 'react'
import { MainContext } from '../../context/context'
import Axios from 'axios';
import DeliveryDetails from './Components/DeliveryDetails';
import PaymentDetails from './Components/PaymentDetails';
import OrderDetails from './Components/OrderDetails';
import ProductDetails from './Components/ProductDetails';
import VendorDetails from './Components/VendorDetails';
import PickUpDetail from './Components/PickUpDetail';
import { useNavigate } from 'react-router-dom';
import OrderCard from './Components/OrderCard';
import './order.css'

const Orders = () => {
  const { baseUrl, token} = useContext(MainContext);
  const navigate = useNavigate();
  const [ordersData, setOrderData] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const fetchOrdersList = async () => 
    {
      try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-food/admin-food-orders`,
          headers: {
            'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Accept": "*/*",
          }
          
        })
  
        console.log('orderlis data', response.data)
        setOrderData(response.data?.data?.bep);

        
      } catch (error) {
        console.error('the order List error', error)
      }
    }

    useEffect(()=>{
      fetchOrdersList()
    }, [])

    function handleOrderFilter (category) {
      
      const filteringData = ordersData.filter(order => order[0].status.includes(category))

      setFilteredData(filteringData);
    }
    useEffect(()=> {  
      handleOrderFilter("")

      console.log('filtered data >>', filteredData);
    }, [ordersData])

    const handleNavigation =(order) =>
      {
        
        navigate(`/dashboard/vendor/orders/${order}`)
      }
  return (
    <div className='order-Data'>
      <h1 style={{fontSize: 35}}>Orders</h1>
      <div className='flex order-card-container'>
        <OrderCard handleClick ={() => handleOrderFilter("")} tittle = 'All' number = {ordersData.filter(order => order[0].status.includes("")).length}/>
        <OrderCard handleClick ={()=> handleOrderFilter("pending")} tittle = 'Pending' number = {ordersData.filter(order => order[0].status.includes("pending") || order[0].status.includes("processing") ).length}/>
        <OrderCard handleClick ={ ()=> handleOrderFilter("cancelled")} tittle = 'Cancelled' number = {ordersData.filter(order => order[0].status.includes("cancelled") ).length}/>
        <OrderCard handleClick ={()=> handleOrderFilter("delivered")} tittle = 'Delivered' number = {ordersData.filter(order => order[0].status.includes("delivered") ).length}/>
      </div>
      {filteredData?.map((order, index)=> (
        <div onClick={()=> handleNavigation(order[0]?._id
        )} key={index} className='shopdetails-div  order-item-holder'>
          <div >{order[0] ? (<OrderDetails order = {order[0]}/>): 'No Order Details'}</div>
          <div>{order[1] ? (<PaymentDetails payment = {order[1][0]}/>): 'No Payment Details'}</div>
          <div>{order[4] ? (<DeliveryDetails delivery = {order[4][0]}/>): 'No Payment Details'}</div>
          {/* <div>{order[6] ? (<ProductDetails product = {order[6]}/>): 'No Payment Details'}</div>
          <div>{order[9] ? (<VendorDetails vendor = {order[9]}/>): 'No Payment Details'}</div> */}
        </div>
      ))}
    </div>
  )
}

export default Orders