import { useState, useEffect, useContext } from "react";
import { MainContext } from "../../context/context";
import {  Image, Table } from 'antd';
import { message } from "antd";
import { useNavigate, Link } from 'react-router-dom'; 
import Axios from 'axios';

const RentalAllCars = () => {
  const {  imgBaseUrl,baseUrl, token } = useContext(MainContext);
  const [dataLoad ,setDataLoad] = useState(false);
  const [vehicleList, setVehicleList] = useState([])
  const navigate = useNavigate(); 

  const getVehicles = async()  =>
    {
      setDataLoad(true)
      try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-carowner/admin-car-rents`,
          headers: {
            'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Accept": "*/*",
          }
        })
  
        console.log(response.data?.data?.data);
        const mergedData = response.data?.data?.data.map((item, index) => ({
          key: index,  // Add a key for React list rendering
          ...item.row,  // Include all fields from row
          ...item.userDetails,  // Include all fields from userDetails
          ...item.vehicle,  // Include all fields from vehicle
          isAvailable: item.vehicle?.isAvailable?.toString()
        }));
        setVehicleList(mergedData);
        console.log(mergedData)
        setDataLoad(false)
       
      } catch (error) {
        message.error(error?.response?.data?.message);
        console.log(error)
        setDataLoad(false)
      }
    }

    useEffect(()=>
      {
        getVehicles()
      }, [])
    const column = [
    
   
      {
        title: 'S/N',
        dataIndex: 'sn',
        render: ( text, record,index) => index + 1,
      },
      {
        title: 'Img',
        dataIndex: 'picture',
        render: (_, record) => (
          <Image
              width={40}
              height={40}
              className='driver-profile-image'
              src={`${imgBaseUrl}${record.picture}`} />
        ),
      },
      {
        title: 'Make',
        dataIndex: 'make',
        filters: [
          { text: 'True', value: 'true' },
          { text: 'False', value: 'false' },
          
        ],
        onFilter: (value, record) => record.isAvailable === value,
      },
      {
        title: 'Model',
        dataIndex: 'model'
      },
      {
        title: 'Year',
        dataIndex: 'year'
      },
      {
        title: 'Vehicles Type',
        dataIndex: 'type'
      },
      {
        title: 'Users Name',
        dataIndex: 'name'
      },
      {
        title: 'Payment Status',
        dataIndex: 'paymentStatus',
        filters: [
          { text: 'No', value: 'no' },
          { text: 'Yes', value: 'yes' },
          
        ],
        onFilter: (value, record) => record.paymentStatus === value,
      },
      
      
      {
        title: 'Status',
        dataIndex: 'isApproved',
        filters: [
          { text: 'True', value: 'true' },
          { text: 'False', value: 'false' },
          
        ],
        onFilter: (value, record) => record.isApproved === value,
      },
      {
        title: 'Round Trip',
        dataIndex: 'isRoundTrip',
        filters: [
          { text: 'True', value: 'true' },
          { text: 'False', value: 'false' },
          
        ],
        onFilter: (value, record) => record.isRoundTrip === value,
      },
       {
        title: 'Date',
        dataIndex: 'createdAt'
      },
    ];
    const handleRowClick = (admins) => {
      navigate(`/dashboard/rental/rentalallcardetails/${admins._id}`);
    };
  return (
    <div style={{padding: '15px'}}>
      <Table style={{background: 'white', }} className="admin-table tables-big" columns={column} dataSource={vehicleList} loading = {dataLoad} onRow={(admin) => ({
          onClick: () => handleRowClick(admin), 
        })} />
    </div>
  )
}

export default RentalAllCars