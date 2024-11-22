import { Table, Tabs, Image } from "antd";
import Axios from 'axios'
import { MainContext } from '../../context/context';
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const {  imgBaseUrl,baseUrl, token } = useContext(MainContext);
  const [rawPropertiesData, setRawPropertiesData] = useState([]);
  const [rawReservationsData, setRawReservationData] = useState([]);
  const [properiesData, setPropertiesData] = useState([])
  const [reservationData, setReservationData] = useState([])
  const navigate = useNavigate()
  const column = [
    {
      title: 'S/N',
      dataIndex: 'sn',
      render: (text, record, index) => index + 1,
    },
    
   
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    
    
     {
      title: 'Phone Number',
      dataIndex: 'phoneNumber'
    },
  ];
 


  const fetchProperties = async () =>
    {
     try {
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}vendor-hotel/admin-hospitalities`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Accept": "*/*",
        }
      })

      console.log(response.data);
      setRawPropertiesData(response.data.data.data)
     } catch (error) {
      console.error('the fetch properties error', error)
     }
    }
    const fetchReservation = async () =>
      {
       try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-hotel/admin-reservations`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Accept": "*/*",
          }
        })
  
        console.log('reservation >>>>',response.data);
        setRawReservationData(response.data.data.data)
       } catch (error) {
        console.error('the fetch properties error', error)
       }
      }

    useEffect(()=>{
      fetchProperties();
      fetchReservation()
    }, [])

    useEffect(()=>{
      
      const processedData = rawPropertiesData?.map(item => ({
        ...item?.row,
        ...item?.userDetailsData,
        userId: item.userDetailsData._id
      }));
    
      setPropertiesData(processedData)
     
    }, [rawPropertiesData])
    useEffect(()=>{
      
      const processedData = rawReservationsData?.map(item => ({
        ...item?.row,
        ...item?.userDetailsData,
        userId: item?.row?._id
      }));
    
      setReservationData(processedData)
     
    }, [rawReservationsData])
    const handleRowClick = (admins) => {
      navigate(`/dashboard/hotel/properties/${admins.userId}`);
    };
    const handleRowClick2 = (admins) => {
      navigate(`/dashboard/hotel/reservations/${admins.userId}`);
    };
  return (
    <div style={{padding: 20}}>
      <h1 style={{fontSize: 35}}>Hotel</h1>
       <Tabs defaultActiveKey="1" >
          <Tabs.TabPane 
          key="1" 
          tab="Properties"
          
          children={(
            <Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={properiesData} columns={column}  onRow={(admin) => ({
              onClick: () => handleRowClick(admin), 
            })}/>
          )}
          />
          <Tabs.TabPane 
            key="2" 
            tab="Reservations"
            children={(
              <Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={reservationData} columns={column} onRow={(admin) => ({
                onClick: () => handleRowClick2(admin), 
              })} />
            )}
          />
        </Tabs>
    </div>
  )
}

export default Hotel