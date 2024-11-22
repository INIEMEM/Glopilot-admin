import { useState, useEffect, useContext, useCallback } from "react";
import { MainContext } from "../../context/context";
import {  Image,  Input, Form, Button, Table } from 'antd';
import { message } from "antd";
import {  useParams } from 'react-router-dom'; 
import { useJsApiLoader, GoogleMap, Marker,} from '@react-google-maps/api';
import { useNavigate, Link } from 'react-router-dom'; 
import SkeletonArticle from "../../skeletons/SkeletonArticle";
import SkeletonProfile from "../../skeletons/SkeletonProfile";
import Skeleton , { SkeletonTheme }from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Axios from 'axios';

const { TextArea } = Input;
const RentalAllCarsDetails = () => {
  const {rentalallcardetails} = useParams()
  const {  imgBaseUrl,baseUrl,setReportDetails,  token } = useContext(MainContext);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [initialVehicleList, setInitialVehicleList] = useState([]);
  const [initialReportList, setInitialReportList] = useState([]);
  const [vehicleReport, setVehicleReport] = useState([]);
  const [driverLocation, setDriverLocation] = useState({lat: 48, lng: 40});
  const [dataLoad ,setDataLoad] = useState(false);
  const [map, setMap] = useState(null); 
  const navigate = useNavigate(); 
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAMK0gm6FqImxY1oLDQ72UcTuZzybFl7Lw',
  })

  const getVehicle = async ()=>
    {
      try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-carowner/admin-car?carId=${rentalallcardetails}`,
          headers:{
            'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Accept": "*/*",
          }
        });
        console.log(response?.data?.data?.data);
        setInitialVehicleList(response?.data?.data?.data)
        
      } catch (error) {
        console.error(error)
      }
    }

    const getVehicleReport = async() =>
      {
        setDataLoad(true)
        try {
          const response = await Axios({
            method: 'get',
            url: `${baseUrl}vendor-carowner/admin-car-reports?carId=${rentalallcardetails}`,
            headers:{
              'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Accept": "*/*",
            }
          });
          console.log('the reports',response?.data.data?.reportData);
          setInitialReportList(response?.data?.data?.reportData);
          setDataLoad(false)
        } catch (error) {
          console.error(error);
          setDataLoad(false)
        }
      }   
 
  useEffect(()=>{
      getVehicleReport()
      getVehicle()
      }, [rentalallcardetails, token]);

  useEffect(()=>{
  const mergedData = {
  ...initialVehicleList.car,
  ...initialVehicleList.userDetails
  }
  setVehicleDetails(mergedData);
  
  }, [initialVehicleList]);

  useEffect(()=>{
    const mergedData = initialReportList.map((item, index) => ({
      key: index,
      ...item.row,
      ...item.user,
      notice: item.notice,
      message: item.messages,
      vendor: item.vendor,
      booking: item.booking,
      
    }))
    
    setVehicleReport(mergedData);
    console.log('the e', vehicleReport)
    }, [initialReportList])
      // Function to handle updating status
   const updateStatus = (adminId, newStatus) => {
    try {


      // Make the API call to update the driver status
      Axios({
        method: `${newStatus == 'remove' ? 'delete' : 'put'}`, // Assuming it's a PUT request to update the status
        url: `${baseUrl}vendor-carowner/admin-car-${newStatus}`,
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Accept": "*/*",
        },
        data: {
          carId: adminId,
        },
      })
      .then((res) => {
        console.log(`Driver ${adminId} status updated to ${newStatus}`);
        // Optionally, refetch the driver list after updating status
        
        message.success(`Admin  status updated to ${newStatus}`);
      })
      .catch((err) => {
        console.error('Failed to update status', err);
        message.error(err.message);
      });
    } catch (error) {
      
    }
  };

  
  useEffect(() => {
    // Cleanup logic when the component unmounts
    return () => {
      setMap(null); // Reset map instance
    };
  }, []);

  useEffect(() => {
    // Fetch actual driver location from vehicle details or API
    setDriverLocation({ lat: vehicleDetails?.latitude || 48, lng: vehicleDetails?.longitude || 40 });
  }, [vehicleDetails]);

  const column = [
    
   
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
      title: 'Phone Number',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'Title',
      dataIndex: 'title'
    },
   
    {
      title: 'Description',
      dataIndex: 'description',
      
    },
    
     {
      title: 'Date',
      dataIndex: 'createdAt'
    },
  ];

  const handleRowClick = (admins) => {
    navigate(`/dashboard/rental/rentalallcardetails/report`);
  };

  if(vehicleDetails.length == 0){
    return (
     <>
      <SkeletonArticle/>
      <SkeletonArticle/>
      <SkeletonArticle/>
      <SkeletonArticle/>
      <SkeletonArticle/>
     </>
    );
  }
else{
  return (
    <div style={{padding:'20px', height: 'auto'}} >
      
    <div className="vehicle-details-holder">
    <h3 style={{fontWeight: '500'}}>Vehicle Location</h3>
    <div className="vehicle-location">
  {isLoaded ? (
    <GoogleMap
    center={driverLocation}
    zoom={15}
    mapContainerStyle={{ width: '100%', height: '100%' }}
    options={{ streetViewControl: false, mapTypeControl: false }}
    onLoad={(mapInstance) => setMap(mapInstance)}
  >
    {/* Render Marker after map is loaded */}
    <Marker position={driverLocation} />
    <Marker position={driverLocation} />
  </GoogleMap>
  
  ) : (
    <div>Loading Map...</div>
  )}
</div>
      <h3 style={{fontWeight: '500'}}>Vehicle Basic Infomation</h3>
      <div className="flex flex-justify-between" style={{marginTop: '10px'}}>
        <div className="vehicle-images">
        <Image.PreviewGroup
          items={vehicleDetails?.pictures?.map(pics => pics)}
          
        >
          <Image
            width={330}
            height={450}
            className="rent-img"
            src={`${imgBaseUrl}${vehicleDetails?.picture}`}
            style={{borderRadius: '15px'}}
          />
        </Image.PreviewGroup>
        </div>
        <div>
        <header>
            
            <Form layout='inline' className='flex flex-center driver-details-form-header' >
              <Form.Item label="Make" layout='vertical'>
                <Input value={vehicleDetails?.make} disabled className='inp-new' />
              </Form.Item>
              <Form.Item label="Model" layout='vertical' >
                <Input value={vehicleDetails?.model}  disabled className='inp-new' />
              </Form.Item>
              
            </Form>
            </header>
            <header>
            
            <Form layout='inline' className='flex flex-center driver-details-form-header' >
              
              <Form.Item label="Color" layout='vertical'>
                <Input value={vehicleDetails?.color} disabled  className='inp-new'/>
              </Form.Item>
              <Form.Item label="Year" layout='vertical'>
                <Input value={vehicleDetails?.year} disabled  className='inp-new'/>
              </Form.Item>
            </Form>
            </header>
            <section className="driver-details-info">
            
            <Form layout='inline' className='flex  flex-center driver-details-form-header' >
              
              
              <Form.Item label=" Millage (miles)" layout='vertical'>
                <Input value={vehicleDetails?.carMillage} className='inp-new' disabled />
              </Form.Item>
              <Form.Item label="Number of Doors" layout='vertical'>
                <Input value={vehicleDetails?.noOfDoors} className='inp-new' disabled />
              </Form.Item>
            </Form>
            </section>
            <section className="driver-details-info">
            
            <Form layout='inline' className='flex  flex-center driver-details-form-header' >
              
              
              <Form.Item label="Seats" layout='vertical'>
                <Input value={vehicleDetails?.seats} className='inp-new'  disabled />
              </Form.Item>
              <Form.Item label="Type of Vehicle" layout='vertical'>
                <Input value={vehicleDetails?.type} className='inp-new'  disabled />
              </Form.Item>
              
              
            </Form>
            </section>
            <section className="driver-details-info">
            
            <Form layout='inline' className='flex  flex-center driver-details-form-header' >
              
              
            <Form.Item label="Type" layout='vertical'>
                <Input value={vehicleDetails?.vehicleType} className='inp-new'  disabled />
              </Form.Item>
              <Form.Item label="Transmission" layout='vertical'>
                <Input value={vehicleDetails?.transmission} className='inp-new'  disabled />
              </Form.Item>
            
            </Form>
            </section>
            <div className='btn-admins flex'>
                <Button onClick={() => updateStatus(vehicleDetails?._id, 'approve')} type="primary" style={{ marginRight: 8 , flex: '1', height: '45px'}}
                  disabled = {vehicleDetails?.adminConsent === 'true'}
                
                >Approve</Button>
              
                <Button onClick={() => updateStatus(vehicleDetails?._id, 'decline')} style={{flex: '1', height: '45px'}}  className='orange-btn'  disabled = {vehicleDetails?.adminConsent === "false"}>Decline</Button>
                <Button type="primary" onClick={() => updateStatus(vehicleDetails?._id, 'remove')} style={{flex: '1', height: '45px', marginLeft: '10px'}} danger >Delete</Button>
              </div>
   </div>
      </div>
      <h3 style={{fontWeight: '500', marginTop: '20px '}}>Vehicle Owners Infomation</h3>
      <div className="flex flex-justify-between" style={{marginTop: '10px'}}>
        <div className="vehicle-images">
        <Image
            width={330}
            height={300}
            className="rent-imgs"
            src={`${imgBaseUrl}${vehicleDetails.profilePic}`}
            style={{borderRadius: '15px'}}
          />
        </div>
        <div>
        <header>
            
            <Form layout='inline' className='flex flex-center driver-details-form-header' >
              <Form.Item label="Name" layout='vertical'>
                <Input value={vehicleDetails?.name} disabled className='inp-new' />
              </Form.Item>
              <Form.Item label="Email" layout='vertical' >
                <Input value={vehicleDetails?.email}  disabled className='inp-new' />
              </Form.Item>
              
            </Form>
            </header>
            <header>
            
            <Form layout='inline' className='flex flex-center driver-details-form-header' >
              
              <Form.Item label="Gender" layout='vertical'>
                <Input value={vehicleDetails?.gender} disabled  className='inp-new'/>
              </Form.Item>
              <Form.Item label="Home Address" layout='vertical'>
                <Input value={vehicleDetails?.homeAddress} disabled  className='inp-new'/>
              </Form.Item>
            </Form>
            </header>
            <section className="driver-details-info">
            
            <Form layout='inline' className='flex  flex-center driver-details-form-header' >
              
              
              <Form.Item label=" Phone Number" layout='vertical'>
                <Input value={vehicleDetails?.phoneNumber} className='inp-new' disabled />
              </Form.Item>
              <Form.Item label="Wallet Balance" layout='vertical'>
                <Input value={vehicleDetails?.walletBalance} className='inp-new' disabled />
              </Form.Item>
            </Form>
            </section>
            
           
           
   </div>
      </div>
      <h3 style={{fontWeight: '500', marginTop: '20px '}}>Vehicle Reports</h3>
      <Table style={{background: 'white', }} className="admin-table tables-big" columns={column} dataSource={vehicleReport} loading = {dataLoad} onRow={(admin) => ({
          onClick: () => {handleRowClick(admin); setReportDetails(admin)}, 
        })} />
    </div>
  </div>
  )
}
  
}

export default RentalAllCarsDetails