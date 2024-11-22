import { useState, useEffect, useContext } from "react";
import { MainContext } from "../../context/context";
import {  Image, Table } from 'antd';
import { message } from "antd";
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import Axios from 'axios';


const RentalCars = () => {
  const {rentalcars} = useParams()
  const {  imgBaseUrl,baseUrl, token } = useContext(MainContext);
  const [dataLoad ,setDataLoad] = useState(false);
  const [carList, setCarList] = useState([]);
  const [joinedArray, setJoinedArray] = useState([])
  const navigate = useNavigate()
  const getCars = async()  =>
    {
      setDataLoad(true)
      try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-carowner/admin-car-by-user?userId=${rentalcars}`,
          headers: {
            'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Accept": "*/*",
          }
        })
  
        console.log(response.data.data.data);
        setCarList(response?.data?.data?.data)
        
        setDataLoad(false)
       
      } catch (error) {
        message.error(error?.response?.data?.message);
        console.log(error)
        setDataLoad(false)
      }
    }
    
    useEffect(()=>
      {
        getCars();
      }, []);
      useEffect(() => {
        if (carList.length !== 0) {
          const mergedData = carList.map((item) => ({
            ...item.row,        // Spread the row data
            ...item.userDetails,// Spread the userDetails data
            carId: item.row._id
          }));
          setJoinedArray(mergedData); // Set the merged array as joinedArray
        }
      }, [carList]);

      const column = [
    
   
        {
          title: 'S/N',
          dataIndex: 'sn',
          render: (text, record, index) => index + 1,
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
          dataIndex: 'make'
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
          title: 'Type of Vehicle',
          dataIndex: 'type'
        },
        {
          title: 'Available',
          dataIndex: 'isAvailable',
          filters: [
            { text: 'True', value: 'true' },
            { text: 'False', value: 'false' },
            
          ],
          onFilter: (value, record) => record.isAvailable === value,
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
          title: 'Date',
          dataIndex: 'createdAt'
        },
      ];
      const handleRowClick = (admins) => {
        navigate(`/dashboard/rental/rentalallcardetails/${admins.carId}`);
      };
  return (
    <div style={{padding: '15px'}}>
      <p>{carList && carList[0]?.userDetails?.email}'s Vehicle List</p>
      <Table style={{background: 'white'}} className="admin-table" columns={column} dataSource={joinedArray} loading = {dataLoad} onRow={(admin) => ({
          onClick: () => handleRowClick(admin), 
        })} />
    </div>
  )
}

export default RentalCars