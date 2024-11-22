import { useState, useEffect, useContext, useCallback } from "react";
import { MainContext } from "../../context/context";
import {  Image,  Input, Form, Button } from 'antd';
import { message } from "antd";
import {  useParams } from 'react-router-dom'; 
import { useJsApiLoader, GoogleMap, Marker,} from '@react-google-maps/api';
import Axios from 'axios';
import './rentals.css'

const RentalCarDetails = () => {
  const {rentalcardetails} = useParams()
  const {  imgBaseUrl,baseUrl, token } = useContext(MainContext);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [driverLocation, setDriverLocation] = useState({lat: 48, lng: 40});
  const [map, setMap] = useState(null); 
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAMK0gm6FqImxY1oLDQ72UcTuZzybFl7Lw',
  })

  const getVehicle = async () => {
    if (!rentalcardetails) {
      console.error("Car ID is missing");
      return;
    }
  
    console.log('Fetching vehicle data');
    try {
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}vendor-carowner/admin-car?carId=${rentalcardetails}`,
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      });
      console.log(response?.data);
      setVehicleDetails(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{
  //   getVehicle()
  // }, [rentalcardetails, token]);
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

  // Memoize the map rendering to prevent unnecessary re-renders
  useEffect(() => {
    // Cleanup logic when the component unmounts
    return () => {
      setMap(null); // Reset map instance
    };
  }, []);

  useEffect(() => {
    // Fetch actual driver location from vehicle details or API
    getVehicle()
    setDriverLocation({ lat: vehicleDetails?.latitude || 48, lng: vehicleDetails?.longitude || 40 });
  }, [vehicleDetails]);
  
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
            items={[
              'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
              'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
              'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
            ]}
            
          >
            <Image
              width={330}
              height={450}
              className="rent-img"
              src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
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
                
                
                <Form.Item label=" Millage" layout='vertical'>
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
      </div>
    </div>
  )
}

export default RentalCarDetails