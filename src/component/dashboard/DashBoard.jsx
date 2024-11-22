import React, { useEffect, useState, useContext } from 'react';
import './dashboard.css'
import CountUp from 'react-countup';
import useSlideUpAnimation from '../../slideup/useSlideupAnimation';  
import { chartData,lineChartOptions, lineData } from './graphsData/graphs';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Table, Tabs, Image } from "antd";
import { MainContext } from '../../context/context';
import {  column,ordersColumn } from './data/data';
import SmallCard from './Components/SmallCard';
import MediumCard from './Components/MediumCard';
import LongCard from './Components/LongCard';
import LongCard2 from './Components/LongCard2';
import { Link } from 'react-router-dom';
import Axios from 'axios'
import OrderCard from '../Vendor/Components/OrderCard';
import { useNavigate } from 'react-router-dom';
import VehicleRouteTable from '../allVehicles/VehicleRouteData';
// import Shops from '../Vendor/Shops';
// Register necessary Chart.js components
ChartJs.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

const DashBoard = () => {
  const {currentUser, baseUrl, token} =  useContext(MainContext);
  const [userRole, setUserRole] = useState(currentUser?.role);
 
  const dataSource = [
    {
      key: '1',
      state: 'Akwaibom ',
      streetAddress: '18b line ewet housing extension',
      maxRooms: 15,
    },
    {
      key: '2',
      state: 'Akwaibom ',
      streetAddress: '18b line ewet housing extension',
      maxRooms: 15,
    },
    {
      key: '3',
      state: 'Akwaibom ',
      streetAddress: '18b line ewet housing extension',
      maxRooms: 15,
    },
  ];

  const rentalColumn = [
    {
      title: 'S/N',
      dataIndex: 'sn',
      render: ( text, record,index) => index + 1,
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
    
  ]
 
  const ordersDataSource = [
    {
      key: '1',
      product: 'yam and Garri ',
      user: 'Iniemem Ekong David',
      quantity: 15,
    },
    {
      key: '2',
      product: 'yam and Garri ',
      user: 'Iniemem Ekong David',
      quantity: 15,
    },
    {
      key: '3',
      product: 'yam and Garri ',
      user: 'Iniemem Ekong David',
      quantity: 15,
    },
  ];

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  const messageColumn = [
    
    {
      title: 'S/N',
      dataIndex: 'sn',
      render: ( text, record,index) => index + 1,
    },
    
    {
      title: 'User Name',
      dataIndex: 'username',
      
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber'
    },
    
  ]
  const messageData =
  [
    {
      key: '1',
      picture: '',
      username: 'iniemem',
      message: 'Hi, how are you doing. Please we ....',
      
    },
    {
      key: '2',
      picture: '',
      username: 'abas davo',
      message: 'Hi, how are you doing. Please we ....',
      
    },
    {
      key: '3',
      picture: '',
      username: 'Emediong etim',
      message: 'Hi, how are you doing. Please we ....',
      
    },
  ]
  const shopColumn =
  [
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
  ]
  const rentalData =
  [
    {
      key: '1',
      picture: '',
      make: 'Honda',
      model: 'c300',
      year: 2300
    },
    {
      key: '2',
      picture: '',
      make: 'Honda',
      model: 'c300',
      year: 2300
    },
    {
      key: '3',
      picture: '',
      make: 'Honda',
      model: 'c300',
      year: 2300
    },
  ]
  const [shopListRawData, setShopListRawData] = useState([]);
  const [shopLists, setShopLists] = useState([])
  const fetchShopList = async () =>
    {
      
      try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-food/admin-shop-foods`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Accept": "*/*",
          }
          
        });
  
        setShopListRawData(response.data?.data?.data);
        
        
        
      } catch (error) {
        console.error('the shop list error >>>', error)
        
      }
    }
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
      setDrivers(response.data?.data?.data)
    } 
    const [rawPropertiesData, setRawPropertiesData] = useState([]);
    const [rawPropertiesData2, setRawPropertiesData2] = useState([]);
    const [rawReservationsData, setRawReservationData] = useState([]);
    const [rawReservationsData2, setRawReservationData2] = useState([]);
    const [totalHospitality, setTotalHospitality] = useState(0)
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

      const fetchProperties2 = async () =>
        {
         try {
          const response = await Axios({
            method: 'get',
            url: `${baseUrl}vendor-house/admin-hospitalities`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              "Accept": "*/*",
            }
          })
    
          console.log(response.data);
          setRawPropertiesData2(response.data.data.data)
         } catch (error) {
          console.error('the fetch properties errorsss', error)
         }
      }
      const fetchReservation2 = async () =>
        {
          try {
          const response = await Axios({
            method: 'get',
            url: `${baseUrl}vendor-house/admin-reservations`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              "Accept": "*/*",
            }
          })
          console.log('reservation >>>>',response.data);
          setRawReservationData2(response.data.data.data)
          } catch (error) {
          console.error('the fetch reservation error', error)
          }
      }
      const [adminList, setAdminList] = useState([]);
      const getAdmins = async()=>
        {    
          try {
            const response = await Axios({
              method: 'get',
              url: `${baseUrl}admin/admins`,
              headers:
            {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Accept": "*/*",
            },
            })      
            console.log('admin list ?890232039',response.data);
            setAdminList(response?.data?.admins);
            
          } catch (error) {
            console.error('Failed to update status', error);
          }
        }
      const [messageList, setMessageList] = useState([])
      const fetchMessageList = async() =>
        {
            
            try {
              const response = await Axios({
                method: 'get', 
                url: `${baseUrl}admin/admins`, 
                headers:{
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                  "Accept": "*/*",
                },
              })
              console.log(response.data)
              setMessageList(response.data?.admins)
              
            } catch (error) {
              console.log('message error >>>>>', error)
              
            }
          }
      const [userList, setUserList] = useState([])
      const [userFilteredList, setUserFilteredList] = useState([])
      const getUser = async()  =>
        {
          
          try {
            const response = await Axios({
              method: 'get',
              url: `${baseUrl}admin/users`,
              headers: {
                'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                  "Accept": "*/*",
              }
            })
      
            // console.log(response.data);
            setUserList(response.data.users);
            
           
          } catch (error) {
            // message.error(error?.response?.data?.message);
           
          }
        }
        useEffect(() => {
          if (userList.length) {
            setUserFilteredList(userList.filter(user => user.userType === 'carOwner'));
            console.log(userFilteredList)
          }
          
        }, [userList]);
        const [routes, setRoutes] = useState({});
        const [rawRoutes, setRawRoutes] = useState({});
        useEffect(() => {
          setRoutes(rawRoutes);
        }, [rawRoutes]);
      
        const fetchRoutes = async () => {
          try {
            const response = await Axios({
              method: "get",
              url: `${baseUrl}vendor-driver/vehicle-routes`,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
      
            console.log(response.data);
            setRawRoutes(response.data);
          } catch (error) {
            console.error("fetch error >>>", error);
          }
        };
        const [rideTypes, setRideTypes] = useState([]);
        const fetchRideTypes = async () => {
          try {
            const response = await Axios({
              method: "get",
              url: `${baseUrl}vendor-driver/trip-types`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setRideTypes(response.data?.data?.rideTpe || []);
          } catch (error) {
            console.error("Error fetching ride types:", error);
          }
        };
        const [promotions, setPromotions] = useState([]);
        const fetchPromotions = async () => {
          try {
            const response = await Axios({
              method: "get",
              url: `${baseUrl}vendor-driver/ride-promotion`,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setPromotions(response.data?.data?.trips || []);
          } catch (error) {
            console.error("Error fetching promotions:", error);
          }
        };
        const [trips, setTrips] = useState([]);
        const fetchTrips = async () => {
          try {
            const response = await Axios({
              method: 'get',
              url: `${baseUrl}vendor-driver/trips`,
              headers:{
                Authorization: `Bearer ${token}`,
              }
            });
            console.log('trips ====>>>>', response.data);
            return response.data.data.data; // Adjust based on actual response structure
          } catch (error) {
            console.error('Error fetching trips:', error);
            return [];
          }
        };
        useEffect(() => {
          const loadTrips = async () => {
            const tripData = await fetchTrips();
            setTrips(tripData);
          };
          loadTrips();
        }, []);
        const tripcolumns = [
          
          {
            title: 'Trip Type',
            dataIndex: ['trip', 'trip'],
            key: 'tripType',
          },
          {
            title: 'Vehicle Type',
            dataIndex: ['vehicle', 'Type'],
            key: 'vehicleType',
          },
          {
            title: 'Price',
            dataIndex: ['charge', 'price'],
            key: 'price',
            render: (price) => `₦${price.toFixed(2)}`,
          },
          {
            title: 'Pickup Time',
            dataIndex: 'pickupTime',
            key: 'pickupTime',
            render: (time) => new Date(time).toLocaleString(),
          },
          
        ];
      
    useEffect(()=>{
      fetchShopList()
      fetchDriverList();
      fetchProperties()
      fetchProperties2()
      fetchReservation()
      fetchReservation2();
      getAdmins();
      fetchMessageList();
      getUser();
      fetchOrdersList()
      fetchRoutes();
      fetchRideTypes();
      fetchPromotions()
    }, []);
    useEffect(()=>{
      setTotalHospitality(rawPropertiesData.length + rawPropertiesData2.length + rawReservationsData.length + rawReservationsData2.length);
    }, [rawPropertiesData, rawPropertiesData2, rawReservationsData, rawReservationsData2])
    useEffect(()=>{
      const processedData = shopListRawData?.map(item => ({
        ...item?.row,
        ...item?.userDetailsData,
        userId: item?.row?._id
      }));

      setShopLists(processedData);
      
      
    }, [shopListRawData])
    const [properiesData, setPropertiesData] = useState([])
    const [reservationData, setReservationData] = useState([])
  useEffect(()=>{
    
    const processedData = rawPropertiesData?.map(item => ({
      ...item?.row,
      ...item?.userDetailsData,
      userId: item?.userDetailsData?._id
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

  const [properiesData2, setPropertiesData2] = useState([])
  const [reservationData2, setReservationData2] = useState([])
  useEffect(()=>{
      
    const processedData = rawPropertiesData2?.map(item => ({
      ...item?.row,
      ...item?.userDetailsData,
      userId: item?.userDetailsData?._id
    }));
  
    setPropertiesData2(processedData)
   
  }, [rawPropertiesData2])
  useEffect(()=>{
    
    const processedData = rawReservationsData2?.map(item => ({
      ...item?.row,
      ...item?.userDetailsData,
      userId: item?.row?._id
    }));
  
    setReservationData2(processedData)
   
  }, [rawReservationsData2])
  const reservationcolumn = [
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
  const [ordersData, setOrderData] = useState([])
  
  const rideColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    
  ];
  const promotioncolumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "Reward",
      dataIndex: "reward",
      key: "reward",
    },
    
   
    
  ];
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
  
        
        setOrderData(response.data?.data?.bep);

        
      } catch (error) {
        console.error('the order List error', error)
      }
    }
    const navigate = useNavigate();

  return (
    <div className='flex flex-column dash' style={{gap:15, padding: 15}}>
      <h1 style={{fontSize: 35}}>Dashboard</h1>
      <div className="user-admin-div-dashboard  user-admin-div-dashboard2" onClick={()=> navigate('/dashboard/vendor/orders')}>
      <div className='flex order-card-container'>
        <OrderCard tittle = 'All' number = {ordersData.filter(order => order[0].status.includes("")).length}/>
        <OrderCard tittle = 'Pending' number = {ordersData.filter(order => order[0].status.includes("pending") || order[0].status.includes("processing") ).length}/>
        <OrderCard  tittle = 'Cancelled' number = {ordersData.filter(order => order[0].status.includes("cancelled") ).length}/>
        <OrderCard handleClick ={()=> handleOrderFilter("delivered")} tittle = 'Delivered' number = {ordersData.filter(order => order[0].status.includes("delivered") ).length}/>
      </div>
      </div>
      <div className="user-admin-div-dashboard flex" style={{gap:15}}>
        {
          (userRole?.includes('vendor') && (<div style={{flex: 1, gap:10}} className='user-div-dashboard-holder flex'>
            <SmallCard link = '/dashboard/vendor/shops' type={`Vendor (${shopListRawData.length})`} animation={true} name='user' declinedCount={shopListRawData?.filter(shop=> shop?.row?.adminConsent === "declined").length} pendingCount={shopListRawData?.filter(shop=> shop?.row?.adminConsent === "pending").length} activeCount = {shopListRawData?.filter(shop=> shop?.row?.adminConsent === 'approved').length}/>
            <SmallCard type={`Driver (${drivers.length})`} link = '/dashboard/alldrivers' animation={true} name = 'user' declinedCount={drivers?.filter(shop=> shop?.row?.adminConsent === "declined").length} pendingCount={drivers?.filter(shop=> shop?.row?.adminConsent === "pending").length} activeCount = {drivers?.filter(shop=> shop?.row?.adminConsent === "approved").length}/>
            <SmallCard type={`Hospitality (${totalHospitality})`} animation={true} name = 'user' declinedCount={0} pendingCount={7} activeCount = {3}/>
          </div>))
        }
        {
          (userRole?.includes('super') && (<div style={{flex: 1}}>
            <SmallCard link='/dashboard/all/admins' type={`Admins (${adminList.length})`} name='user' declinedCount={adminList?.filter(shop=> shop?.adminConsent === "declined").length} pendingCount={adminList?.filter(shop=> shop?.adminConsent === "pending").length} activeCount = {adminList?.filter(shop=> shop?.adminConsent === "approved").length}/>
          </div>))
        }
      </div>
      
      <div className="user-admin-div-dashboard flex" style={{gap:15}}>
        {(userRole?.includes('super')) && ( <div style={{flex: 1, gap:10}} className='user-div-dashboard-holder flex'>
        <MediumCard content = {<Line data={lineData}  options={lineChartOptions}/>  } name = 'revenue' type = '₦210,000'/>
        </div>)}
        <div style={{flex: 1}}>
        <MediumCard link = '/dashboard/vendor/shops' content = {<Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={shopLists.slice(0, 2)} columns={shopColumn}  />} name = 'Shop' type = {`Shop (${shopLists.length})`}/>
        </div>
      </div>
      <div className="user-admin-div-dashboard flex" style={{gap:15}}>
        {(userRole?.includes('driver') || userRole?.includes('super')) &&(<div style={{flex: 1, gap:10}} className='user-div-dashboard-holder flex'>
        <MediumCard link = '/dashboard/allVehicles/routes'  content = {<VehicleRouteTable routeData={routes} /> } name = 'Routes' type = 'Routes'/>  
        </div>)}
        {(userRole?.includes('driver') || userRole?.includes('super')) && (<div style={{flex: 1}}>
        <MediumCard link = '/dashboard/allVehicles/ride/types' content = {<Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={rideTypes.map((ride) => ({ ...ride, key: ride._id })).slice(0,3)} columns={rideColumn}  /> } name = 'Ride Types' type = {`Ride Types`}/> 
        </div>)}
      </div>
      <div className="user-admin-div-dashboard flex" style={{gap:15}}>
        {(userRole?.includes('driver') || userRole?.includes('super')) &&(<div style={{flex: 1, gap:10}} className='user-div-dashboard-holder flex'>
        <MediumCard link = '/dashboard/allVehicles/promotions'  content = {<Table
        style={{background: 'white', }}
        dataSource={promotions.map((promo) => ({ ...promo, key: promo._id })).slice(0,3)}
        columns={promotioncolumns}
        className="admin-table admin-table23 "
        bordered
      />} name = 'Promotion' type = 'Promotions'/>  
        </div>)}
        {(userRole?.includes('driver') || userRole?.includes('super')) && (<div style={{flex: 1}}>
        <MediumCard link = '/dashboard/allVehicles/trips' content = {<Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={trips.slice(0,3)} columns={tripcolumns}  /> } name = 'Trip List' type = {`Trip List`}/> 
        </div>)}
      </div>
      <div className="user-admin-div-dashboard flex" style={{gap:15}}>
        <div style={{flex: 1, gap:10}} className='user-div-dashboard-holder flex'>
        <MediumCard link = '/dashboard/messages'  content = {<Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={messageList.slice(0,3)} columns={messageColumn}  />  } name = 'Messages' type = 'Messages'/>  
        </div>
        {(userRole?.includes('rental') || userRole?.includes('super')) && (<div style={{flex: 1}}>
        <MediumCard link = '/dashboard/rental/user' content = {<Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={userFilteredList.slice(0,3)} columns={rentalColumn}  /> } name = 'Rental' type = {`Rental Vehicles (${userFilteredList.length})`}/> 
        </div>)}
      </div>
      <div className="user-admin-div-dashboard  user-admin-div-dashboard2" >
        <Tabs defaultActiveKey="1" >
          <Tabs.TabPane 
          key="1" 
          tab="Hotel"
          
          children={(
            <div style={{flex: 1, gap:10}} className='user-div-dashboard-holder flex'>
              <LongCard link = '/dashboard/hotel' content={<Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={reservationData} columns={reservationcolumn}  />} name='Hotel' type={`Reservations (${reservationData.length})`}/>
              <LongCard link = '/dashboard/hotel' content={<Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={properiesData} columns={reservationcolumn}  />} name='Hotel' type={`Properties (${properiesData.length})`}/>
            </div>
          )}
          />
          <Tabs.TabPane 
            key="2" 
            tab="House"
            children={(
              <div style={{flex: 1, gap:10}} className='user-div-dashboard-holder flex'>
                <LongCard link = '/dashboard/house' content={<Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={reservationData2} columns={reservationcolumn}  />} name='House' type={`Reservations (${reservationData2.length})`}/>
                <LongCard link = '/dashboard/house' content={<Table style={{background: 'white', }} className="admin-table admin-table23 " dataSource={properiesData2} columns={reservationcolumn}  />} name='House' type={`Properties (${properiesData2.length})`}/>
              </div>
            )}
          />
        </Tabs>
      </div>
      
    </div>
  )
}

export default DashBoard