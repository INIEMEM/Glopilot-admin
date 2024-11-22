import React, {useContext, useEffect, useState} from 'react'
import { MainContext } from '../../context/context';
import { Link, useParams } from 'react-router-dom'
import { Image, Form , Input, Table, Button, Carousel, Select, message, Dropdown, Popover} from 'antd';
import Axios  from 'axios';
import { formatDate } from '../../Utils/Formatdate';
import { label } from 'framer-motion/client';
const { Option } = Select;
const HotelReservationDetails = () => {
  const {  imgBaseUrl,baseUrl, token } = useContext(MainContext);
  const{hotelReservations} = useParams();
  const [userdetailsProps, setUserDetailsProps] = useState([])
  const [propertiesDetails, setPropertyDetails] = useState([]);
  const [cancelMessage, setCancelMessage] = useState('')
  
  

  const fetchUserProperties =  async () =>
    {
      try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-hotel/admin-reservation?reservationId=${hotelReservations}`,
          headers: 
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Accept": "*/*",
          }
        });

        console.log('the response for the data',response.data)
        setUserDetailsProps(response.data?.data?.data[0]?.userDetailsData);
        setPropertyDetails(response.data?.data?.data)
      } catch (error) {
        console.error('error for props', error)
      }
    }

    useEffect(()=>{
      fetchUserProperties();
    }, [token]);

     // Function to handle updating status
     const updateStatus = (propertyId, newStatus) => 
      {

         // Define the message based on the newStatus
        let statusMessage = '';
        if (newStatus === 'cancel') {
          statusMessage = cancelMessage;
        } else if (newStatus === 'suspend') {
          statusMessage = cancelMessage;
        }
      // Make the API call to update the driver status
      Axios({
        method: 'put', // Assuming it's a PUT request to update the status
        url: `${baseUrl}vendor-hotel/admin-reservation-${newStatus}`,
        headers: 
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Accept": "*/*",
          },
        data: {
          reservationId: propertyId,
          ...(statusMessage && { message: statusMessage }),
        },
      })
      .then((res) => {
        console.log(`Driver ${propertyId} status updated to ${newStatus}`);
        // Optionally, refetch the driver list after updating status
        message.success('sucess')
        console.log('the',res.data)
      })
      .catch((err) => {
        console.error('Failed to update status', err);
      });
    };
    
  return (
    <div className='hospitality-details' style={{padding:20}}> 
        <div className="hospitality-details-holder">
            <h3>User Details</h3>
            <div className="hospitality-userdetails-section flex flex-justify-between">
                <div>
                  <Image src={`${imgBaseUrl}${userdetailsProps?.profilePic}`} width={300} height={400} style={{objectFit: 'contain'}}/>
                </div>
                <div>
                <Form layout='inline' className='flex flex-center driver-details-form-header' >
                  <Form.Item label=" Name" layout='vertical'>
                    <Input value={userdetailsProps?.name} disabled className='inp-new' />
                  </Form.Item>
                  <Form.Item label=" Email" layout='vertical' >
                    <Input value={userdetailsProps?.email} disabled className='inp-new' />
                  </Form.Item>
                </Form>
                <Form layout='inline' className='flex flex-center driver-details-form-header' >
                  <Form.Item label=" Gender" layout='vertical'>
                    <Input value={userdetailsProps?.gender} disabled className='inp-new' />
                  </Form.Item>
                  <Form.Item label="Date of Birth" layout='vertical' >
                    <Input value={userdetailsProps?.dob} disabled className='inp-new' />
                  </Form.Item>
                </Form>
                <Form layout='inline' className='flex flex-center driver-details-form-header' >
                  <Form.Item label=" Home address" layout='vertical'>
                    <Input value={userdetailsProps?.homeAddress} disabled className='inp-new' />
                  </Form.Item>
                  <Form.Item label="Work address" layout='vertical' >
                    <Input value={userdetailsProps?.workAddress} disabled className='inp-new' />
                  </Form.Item>
                </Form>
                <Form layout='inline' className='flex flex-center driver-details-form-header' >
                  <Form.Item label=" Phone number" layout='vertical'>
                    <Input value={userdetailsProps?.phoneNumber} disabled className='inp-new' />
                  </Form.Item>
                  <Form.Item label="Wallet balance" layout='vertical' >
                    <Input value={userdetailsProps?.walletBalance} disabled className='inp-new' />
                  </Form.Item>
                </Form>
               
                
                </div>

                
            </div>
            <div>
              <h3 style={{marginBottom: 20}}>Property details</h3>
                  {propertiesDetails?.map(property => (
                    <div>
                      <div className='flex flex-justify-between hyussss'>
                        <div>
                          <Carousel style={{
                            width: 300,
                            height: 400
                          }}>
                              {
                                property?.hospitality?.gallery?.map(image => (<Image src={`${imgBaseUrl}${image?.image}`} width={300} height={400}/>))
                              }
                              
                          </Carousel>
                        </div>
                        <div>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Admin concent" layout='vertical'>
                              <Input value={property?.hospitality?.adminConsent} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label=" Admin concent message" layout='vertical' >
                              <Input value={property?.hospitality?.adminConsentMessage} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" City" layout='vertical'>
                              <Input value={property?.hospitality?.city} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label=" Country" layout='vertical' >
                              <Input value={property?.hospitality?.country} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest arrive after" layout='vertical'>
                              <Input value={property?.hospitality?.guestArriveAfter} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest arrive after" layout='vertical' >
                              <Input value={property?.hospitality?.guestArriveBefore} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest booking time frame" layout='vertical'>
                              <Input value={property?.hospitality?.guestBookingTimeframe} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest Booking" layout='vertical' >
                                <Select
                                    placeholder="view all"
                                    style={{width: '270px'}}
                                    
                                  >
                                  {property?.hospitality?.guestBooking?.map(bookings => (<Option value={bookings?.name} className='inp-new'>{bookings?.name}</Option>))}
                                </Select>
                            </Form.Item>
                          </Form>
                          
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest checking in from" layout='vertical'>
                              <Input value={property?.hospitality?.guestCheckinFrom} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest check in to" layout='vertical' >
                              <Input value={property?.hospitality?.guestCheckinTo} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest Max Stay" layout='vertical'>
                              <Input value={property?.hospitality?.guestMaxStay} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest Minmum Stay" layout='vertical' >
                              <Input value={property?.hospitality?.guestMinStay} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest Request Without A Day Notice" layout='vertical'>
                              <Input value={property?.hospitality?.guestRequestWithoutADayNotice} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest Requirement" layout='vertical' >
                              <Input value={property?.hospitality?.guestRequirement} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest Stay More Than Max" layout='vertical'>
                              <Input value={property?.hospitality?.guestStayMoreThanMax} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest Stay How Long" layout='vertical' >
                              <Input value={property?.hospitality?.guestStayHowLong} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest Leave Before" layout='vertical'>
                              <Input value={property?.hospitality?.guestleaveBefore} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Notice Period Before Arrival" layout='vertical' >
                              <Input value={property?.hospitality?.noticePeriodB4Arrival} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Bar" layout='vertical'>
                              <Input value={property?.hospitality?.hasBar} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Gym" layout='vertical' >
                              <Input value={property?.hospitality?.hasGym} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label="Restaurant" layout='vertical'>
                              <Input value={property?.hospitality?.hasRestaurant} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Publish" layout='vertical' >
                              <Input value={property?.hospitality?.publish} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Rules" layout='vertical'>
                              <Select
                                placeholder="view all rules"
                                style={{width: '270px'}} 
                              >
                                {property?.hospitality?.rules?.map(bookings => (<Option key={bookings?.id} value={bookings?.name} className='inp-new'>{bookings?.name}</Option>))}
                              </Select>
                            </Form.Item>
                            <Form.Item label="Amenities" layout='vertical' >
                              <Select
                                  placeholder="view all amenities"
                                  style={{width: '270px'}}
                                  
                                >
                                {property?.hospitality?.amenities?.map(bookings => (<Option value={bookings?.name} className='inp-new'>{bookings?.name}</Option>))}
                              </Select>
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label="Max Rooms" layout='vertical'>
                              <Input value={property?.hospitality?.maxRooms} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Regularization Number" layout='vertical' >
                              <Input value={property?.hospitality?.regularizationNumber} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label="State" layout='vertical'>
                              <Input value={property?.hospitality?.state} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Street Address" layout='vertical' >
                              <Input value={property?.hospitality?.streetAddress} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label="Zip Code" layout='vertical'>
                              <Input value={property?.hospitality?.zipCode} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Reviews" layout='vertical' >
                              <Input value={property?.hospitality?.streetAddress} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          
                           
                         
                        </div>
                        
                  </div>
                  <h3>Reservation details</h3>
                  <div style={{position: 'relative'}}>
                    <Form layout='inline' className='flex flex-align driver-details-form-header' >
                      <Form.Item label=" Admin concent" layout='vertical'>
                        <Input value={property?.reservation?.adminConsent} disabled className='inp-new' />
                      </Form.Item>
                      <Form.Item label=" Admin concent message" layout='vertical' >
                        <Input value={property?.reservation?.adminConsentMessage} disabled className='inp-new' />
                      </Form.Item>
                      <Form.Item label=" Additional fees" layout='vertical' >
                        <Input value={property?.reservation?.additionalFees} disabled className='inp-new' />
                      </Form.Item>
                      
                    </Form>
                    <Form layout='inline' className='flex flex-align driver-details-form-header' >
                      
                      <Form.Item label=" Payment status" layout='vertical' >
                        <Input value={property?.reservation?.paymentStatus} disabled className='inp-new' />
                      </Form.Item>
                      <Form.Item label=" Status" layout='vertical' >
                        <Input value={property?.reservation?.status} disabled className='inp-new' />
                      </Form.Item>
                      <Form.Item label=" User status" layout='vertical' >
                        <Input value={property?.reservation?.userStatus} disabled className='inp-new' />
                      </Form.Item>
                    </Form>
                    <Form layout='inline' className='flex flex-align driver-details-form-header' >
                      
                      <Form.Item label=" CreatedAt" layout='vertical' >
                        <Input value={formatDate(property?.reservation?.createdAt)} disabled className='inp-new' />
                      </Form.Item>
                      <Form.Item label=" From when" layout='vertical' >
                        <Input value={formatDate(property?.reservation?.fromWhen)} disabled className='inp-new' />
                      </Form.Item>
                      <Form.Item label=" To when" layout='vertical' >
                        <Input value={property?.reservation?.toWhen} disabled className='inp-new' />
                      </Form.Item>
                    </Form>
                    <Form layout='inline' className='flex flex-align driver-details-form-header' >
                      
                      <Form.Item label=" Total Cost" layout='vertical' >
                        <Input value={property?.reservation?.totalCost} disabled className='inp-new' />
                      </Form.Item>
                      <Form.Item label=" Total Hours" layout='vertical' >
                        <Input value={property?.reservation?.totalHours} disabled className='inp-new' />
                      </Form.Item>
                      <Form.Item label="Number of rooms" layout='vertical' >
                        <Input value={property?.reservation?.rooms.length} disabled className='inp-new' />
                      </Form.Item>
                    </Form>
                    <Form layout='inline' className='flex flex-align driver-details-form-header' >
                      
                      <Form.Item label=" Guest" layout='vertical' >
                        {property?.reservation.guests.map((guest, index) => 
                        (
                        <Dropdown
                          menu={{
                            items: [
                              {
                                key: `${index}-adults`,
                                label: <p>{`Adults - ${guest?.adults}`}</p>,
                              },
                              {
                                key: `${index}-children`,
                                label: <p>{`Children - ${guest?.children}`}</p>,
                              },
                            ],
                          }}
                          placement="bottom"
                          arrow
                        >
                          <Button className='inp-new'>View Guest Details</Button>
                        </Dropdown>))}
                      </Form.Item>
                      <Form.Item label=" Is User Refunded" layout='vertical' >
                      {property?.reservation.isUserRefunded.map((guest, index) => 
                        (
                        <Dropdown
                          menu={{
                            items: [
                              {
                                key: `${index}-adults`,
                                label: <p>{`Amount - ${guest?.amount}`}</p>,
                              },
                              {
                                key: `${index}-children`,
                                label: <p>{`Status - ${guest?.status}`}</p>,
                              },
                              {
                                key: `${index}-time`,
                                label: <p>{`Time - ${formatDate(guest?.time)}`}</p>,
                              },
                            ],
                          }}
                          placement="bottom"
                          arrow
                        >
                          <Button className='inp-new'>View Is refunded</Button>
                        </Dropdown>))}
                      </Form.Item>
                      <Form.Item label="Is Vendor Paid" layout='vertical' >
                      {property?.reservation.isVendorPaid.map((guest, index) => 
                        (
                        <Dropdown
                          menu={{
                            items: [
                              {
                                key: `${index}-adults`,
                                label: <p>{`Amount - ${guest?.amount}`}</p>,
                              },
                              {
                                key: `${index}-children`,
                                label: <p>{`Status - ${guest?.status}`}</p>,
                              },
                              {
                                key: `${index}-time`,
                                label: <p>{`Time - ${formatDate(guest?.time)}`}</p>,
                              },
                            ],
                          }}
                          placement="bottom"
                          arrow
                        >
                          <Button className='inp-new'>View Is refunded</Button>
                        </Dropdown>))}
                      </Form.Item>
                    </Form>
                    <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" " layout='vertical' style={{flex:1}}>
                              <Button style={{width: '90%'}} onClick={()=>{updateStatus(property?.reservation?._id, 'approve')}} disabled = {property?.reservation?.adminConsent == "approved"}>
                                Approve
                              </Button>
                            </Form.Item>
                            <Form.Item label=" " layout='vertical'  style={{flex:1}}>
                              <Popover 
                                  content={(
                                    <div>
                                      <Input className='inp-new' placeholder='Type message here' value={cancelMessage} onChange={(e)=>{setCancelMessage(e.target.value)}}/><br />
                                      <Button type='primary' style={{marginTop: 10, width: '100%'}} onClick={()=>{updateStatus(property?.reservation?._id, 'cancel')}}>Submit</Button>
                                    </div>)}
                                  placement="bottom"
                                  arrow
                                  trigger={['click']}
                              >
                                <Button style={{width: '90%'}} >
                                  Cancel
                                </Button>
                              </Popover>
                            </Form.Item>
                            <Form.Item label=" " layout='vertical' style={{flex:1}} >
                            <Popover 
                                  content={(
                                    <div>
                                      <Input className='inp-new' placeholder='Type message here' value={cancelMessage} onChange={(e)=>{setCancelMessage(e.target.value)}}/><br />
                                      <Button type='primary' style={{marginTop: 10, width: '100%'}} onClick={()=>{updateStatus(property?.reservation?._id, 'suspend')}}>Submit</Button>
                                    </div>)}
                                  placement="bottom"
                                  arrow
                                  trigger={['click']}
                              >
                                <Button style={{width: '90%'}} >
                                  Suspend
                                </Button>
                              </Popover>
                            </Form.Item>
                          </Form>
                          <div style={{position: 'absolute', top: 0, right: 10, fontSize: 12, fontWeight: 600, color: '#666'}}><Link to={`/dashboard/house/notice/${property?.reservation?._id}`}>View Notices</Link></div>
                  </div>
                 
                    </div>))}
  
              
                </div>
        </div>
    </div>
  )
}

export default HotelReservationDetails