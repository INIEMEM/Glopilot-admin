import { useState, useEffect, useContext,  } from "react";
import Axios from 'axios';
import { MainContext } from "../../context/context";
import {  Image,  Input, Form, Button, Table, Dropdown, DatePicker, Popover} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useJsApiLoader, GoogleMap, Marker,} from '@react-google-maps/api';
import { div } from "framer-motion/client";

import { fetchUserDetails } from "../../Utils/FetchUserDetails";
import Messages from "../Messages";
dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
const {TextArea} = Input
const RentalReport = () => {
  const {  imgBaseUrl,baseUrl, token, reportDetails } = useContext(MainContext);
  const [likedVendorsDetails, setLikedVendorsDetails] = useState([]);
  const [shopDetails, setShopDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [visibleItems, setVisibleItems] = useState(2);  
  const [pickupLocation, setpickupLocation] = useState({
    lat: reportDetails?.booking?.pickupLocation[0],
    lng: reportDetails?.booking?.pickupLocation[1]
  })
  const [dropoffLocation, setdropoffLocation] = useState({
    lat: reportDetails?.booking?.dropoffLocation[0],
    lng: reportDetails?.booking?.dropoffLocation[1]
  })

  const renderRequestStatus = (statuses) => {
    return statuses?.slice(0, visibleItems).map((statusArray, index) => (
      // Map through the inner array
      statusArray.map((status, idx) => (
        <Form key={`${index}-${idx}`} layout='inline' className='flex flex-center driver-details-form-header'>
          <Form.Item label="Status" layout='vertical'>
            <Input value={status?.status} disabled className='inp-new inp-newss' />
          </Form.Item>
          <Form.Item label="Time" layout='vertical'>
            <Input value={dayjs(status?.time).format('YYYY/MM/DD HH:mm')} disabled className='inp-new inp-newss' />
          </Form.Item>
          <Form.Item label="Description" layout='vertical'>
            <TextArea value={status?.description} disabled className='inp-new inp-newsss'  />
          </Form.Item>
        </Form>
      ))
    ));
  };
  
  const handleSeeMore = () => {
    setVisibleItems(prevVisible => prevVisible + 2); // Show 2 more items on each click
  };
  const navigate = useNavigate();
  console.log('the report detailss',reportDetails)

  useEffect(() => {
    if (reportDetails?.userId) {
      fetchUserDetails(reportDetails?.userId, token, baseUrl).then(data => {
        setUserDetails(data);  // Store user details in state
      });
    }
  }, [reportDetails, token, baseUrl]); 
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAMK0gm6FqImxY1oLDQ72UcTuZzybFl7Lw',
  })
  return (
    <div style={{padding: '15px'}} className="report-data-container">
      <h2 style={{fontWeight: '500'}}>Vehicle Report Page</h2>
      <div className="vehicle-details-holder ">
      <h3 style={{fontWeight: '500', color: '#555'}}>User's Information</h3>
      <div className="flex flex-justify-between request-response-booking" style={{marginTop: '10px'}}>
        <div className="vehicle-images">
        <Image
            width={330}
            height={230}
            className="rent-imgs"
            src={`${imgBaseUrl}${userDetails?.profilePic}`}
            style={{borderRadius: '15px'}}
          />
        </div>
        <div>
        <header>
            
            <Form layout='inline' className='flex flex-center driver-details-form-header' >
              <Form.Item label="Name" layout='vertical'>
                <Input value={userDetails?.name} disabled className='inp-new' />
              </Form.Item>
              <Form.Item label="Email" layout='vertical' >
                <Input value={userDetails?.email}  disabled className='inp-new' />
              </Form.Item>
              
            </Form>
            </header>
            <header>        
            <Form layout='inline' className='flex flex-center driver-details-form-header' >
              
              <Form.Item label="Gender" layout='vertical'>
                <Input value={userDetails?.gender} disabled  className='inp-new'/>
              </Form.Item>
              <Form.Item label="User Type" layout='vertical'>
                <Input value={userDetails?.userType} disabled  className='inp-new'/>
              </Form.Item>
            </Form>
            </header>
            <section className="driver-details-info">
            
            <Form layout='inline' className='flex  flex-center driver-details-form-header' >
              
              
              <Form.Item label=" Phone Number" layout='vertical'>
                <Input value={userDetails?.phoneNumber} className='inp-new' disabled />
              </Form.Item>
               <Form.Item label=" Home Address" layout='vertical'>
                <Input value={userDetails?.homeAddress} className='inp-new' disabled />
              </Form.Item>
             
            </Form>
            </section>          
   </div>
      </div>
                  
      <h3 style={{fontWeight: '500', color: '#555'}}>Booking's Information</h3>
      <div className="booking-div ">
      <Form layout='inline' className='flex flex-center driver-details-form-header ' >
              
        <Form.Item label="Retal Type" layout='vertical'>
          <Input value={reportDetails?.booking?.rentalType} disabled  className='inp-new inp-news' style={{flex: 1}}/>
        </Form.Item>
        <Form.Item label="Rental Start & End Date" layout='vertical'>
        <RangePicker
          defaultValue={[dayjs(`${reportDetails?.booking?.rentalEndDate}`, dateFormat), dayjs(`${reportDetails?.booking?.rentalEndDate}`, dateFormat)]}
          format={dateFormat}
          className='inp-new inp-news'
          disabled
        />
        </Form.Item>
        <Form.Item label="Rental Status" layout='vertical'>
          <Input value={reportDetails?.booking?.status} disabled  className='inp-new inp-news' style={{flex: 1}}/>
        </Form.Item>
        
      </Form>
      <Form layout='inline' className='flex flex-center driver-details-form-header' >
              
        <Form.Item label="Payment Method" layout='vertical'>
          <Input value={reportDetails?.booking?.paymentMethod} disabled  className='inp-new inp-news' style={{flex: 1}}/>
        </Form.Item>
        <Form.Item label="Total Cost" layout='vertical'>
        <Input value={reportDetails?.booking?.totalCost} disabled  className='inp-new inp-news' style={{flex: 1}}/>
        </Form.Item>
        <Form.Item label="Additional Fees" layout='vertical'>
          <Input value={reportDetails?.booking?.additionalFees} disabled  className='inp-new inp-news' style={{flex: 1}}/>
        </Form.Item>
        
      </Form>
      <section className="flex google-map-section   ">
          <div>
            <h3 style={{fontWeight: 400, fontSize: 14}}>Pick up Location</h3>
          {isLoaded ? (
            <GoogleMap
              center={pickupLocation}
              zoom={15}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{ streetViewControl: false, mapTypeControl: false }}
              
            >
              {/* Render Marker after map is loaded */}
              <Marker position={pickupLocation} />
              <Marker position={pickupLocation} />
            </GoogleMap>
          
          ) : (
            <div>Loading Map...</div>
          )}
          </div>
          <div>
            <h3 style={{fontWeight: 400, fontSize: 14}}>Drop off Location</h3>
          {isLoaded ? (
            <GoogleMap
              center={dropoffLocation}
              zoom={15}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{ streetViewControl: false, mapTypeControl: false }}
              
            >
              {/* Render Marker after map is loaded */}
              <Marker position={dropoffLocation} />
              <Marker position={dropoffLocation} />
            </GoogleMap>
          
          ) : (
            <div>Loading Map...</div>
          )}
          </div>
      </section>
      <h3 style={{fontWeight: 400, fontSize: 14}}>Request Statuss</h3>
      <section className="report-data-container request-response-booking flex" style={{ flexWrap: 'wrap' }}>
      {renderRequestStatus(reportDetails?.booking?.requestStatus)}
        
      </section>
      {visibleItems < reportDetails?.booking?.requestStatus.length && (
        <Button type="default" onClick={handleSeeMore} style={{fontSize: 12}}>See More</Button>
      )}
      
      </div>
      <h3 style={{fontWeight: '500', color: '#555'}}>Notice</h3>
      <section className=" flex" style={{flexWrap: 'wrap'}}>
      
      {reportDetails?.notice?.slice(0, visibleItems).map((item, index) => (
        <Form key={index} layout="inline" className="flex flex-center driver-details-form-header">
          <Form.Item label="Status" layout="vertical">
            <Input value={item?.title} disabled className="inp-new inp-newss" />
          </Form.Item>
          {/* <Form.Item label="Time" layout="vertical">
            <Input value={item?.noticeFor} disabled className="inp-new inp-newss" />
          </Form.Item> */}
          <Form.Item label="Description" layout="vertical">
            <TextArea value={item?.description} disabled className="inp-new inp-newsss" />
          </Form.Item>
        </Form>
      ))}
      {/* Show "See More" button only if there are more items to show */}
      {visibleItems < reportDetails?.notice?.length && (
        <Button onClick={handleSeeMore} style={{ marginTop: '10px' }}>
          See More
        </Button>
      )}
      </section> 
      <h3 style={{fontWeight: '500', color: '#555'}}>Messages</h3>
      <section className="messages-section">
        <Messages messageArray= {reportDetails?.message} bookingId = {reportDetails?.booking?._id}/>
      </section>
      </div>
    </div>
  )
}

export default RentalReport