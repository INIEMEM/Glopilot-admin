import React, {useContext, useEffect, useState} from 'react'
import { MainContext } from '../../context/context';
import { useParams } from 'react-router-dom'
import { Image, Form , Input, Table, Button, Carousel, Select, message} from 'antd';
import Axios  from 'axios';

const { Option } = Select;
const HousePropertiesDetails = () => {
  const {  imgBaseUrl,baseUrl, token } = useContext(MainContext);
  const{houseProperties} = useParams();
  const [userdetailsProps, setUserDetailsProps] = useState([])
  const [propertiesDetails, setPropertyDetails] = useState([])
  const fetchUserProperties =  async () =>
    {
      try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-hotel/admin-hospitality-by-user?userId=${houseProperties}`,
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
    fetchUserProperties()
  },[token])

    // Function to handle updating status
    const updateStatus = (propertyId, newStatus) => 
      {
      // Make the API call to update the driver status
      Axios({
        method: 'put', // Assuming it's a PUT request to update the status
        url: `${baseUrl}vendor-hotel/admin-hospitality-${newStatus}`,
        headers: 
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Accept": "*/*",
          },
        data: {
          propertyId: propertyId,
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
                    <div className='flex flex-justify-between hyussss'>
                        <div>
                          <Carousel style={{
                            width: 300,
                            height: 400
                          }}>
                              {
                                property?.row?.gallery?.map(image => (<Image src={`${imgBaseUrl}${image?.image}`} width={300} height={400}/>))
                              }
                              
                          </Carousel>
                        </div>
                        <div>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Admin concent" layout='vertical'>
                              <Input value={property?.row?.adminConsent} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label=" Admin concent message" layout='vertical' >
                              <Input value={property?.row?.adminConsentMessage} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" City" layout='vertical'>
                              <Input value={property?.row?.city} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label=" Country" layout='vertical' >
                              <Input value={property?.row?.country} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest arrive after" layout='vertical'>
                              <Input value={property?.row?.guestArriveAfter} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest arrive after" layout='vertical' >
                              <Input value={property?.row?.guestArriveBefore} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest booking time frame" layout='vertical'>
                              <Input value={property?.row?.guestBookingTimeframe} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest Booking" layout='vertical' >
                                <Select
                                    placeholder="view all"
                                    style={{width: '270px'}}
                                    
                                  >
                                  {property?.row?.guestBooking?.map(bookings => (<Option value={bookings?.name} className='inp-new'>{bookings?.name}</Option>))}
                                </Select>
                            </Form.Item>
                          </Form>
                          
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest checking in from" layout='vertical'>
                              <Input value={property?.row?.guestCheckinFrom} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest check in to" layout='vertical' >
                              <Input value={property?.row?.guestCheckinTo} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest Max Stay" layout='vertical'>
                              <Input value={property?.row?.guestMaxStay} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest Minmum Stay" layout='vertical' >
                              <Input value={property?.row?.guestMinStay} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest Request Without A Day Notice" layout='vertical'>
                              <Input value={property?.row?.guestRequestWithoutADayNotice} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest Requirement" layout='vertical' >
                              <Input value={property?.row?.guestRequirement} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest Stay More Than Max" layout='vertical'>
                              <Input value={property?.row?.guestStayMoreThanMax} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Guest Stay How Long" layout='vertical' >
                              <Input value={property?.row?.guestStayHowLong} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Guest Leave Before" layout='vertical'>
                              <Input value={property?.row?.guestleaveBefore} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Notice Period Before Arrival" layout='vertical' >
                              <Input value={property?.row?.noticePeriodB4Arrival} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Bar" layout='vertical'>
                              <Input value={property?.row?.hasBar} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Gym" layout='vertical' >
                              <Input value={property?.row?.hasGym} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label="Restaurant" layout='vertical'>
                              <Input value={property?.row?.hasRestaurant} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Publish" layout='vertical' >
                              <Input value={property?.row?.publish} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" Rules" layout='vertical'>
                              <Select
                                placeholder="view all rules"
                                style={{width: '270px'}} 
                              >
                                {property?.row?.rules?.map(bookings => (<Option value={bookings?.name} className='inp-new'>{bookings?.name}</Option>))}
                              </Select>
                            </Form.Item>
                            <Form.Item label="Amenities" layout='vertical' >
                              <Select
                                  placeholder="view all amenities"
                                  style={{width: '270px'}}
                                  
                                >
                                {property?.row?.amenities?.map(bookings => (<Option value={bookings?.name} className='inp-new'>{bookings?.name}</Option>))}
                              </Select>
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label="Max Rooms" layout='vertical'>
                              <Input value={property?.row?.maxRooms} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Regularization Number" layout='vertical' >
                              <Input value={property?.row?.regularizationNumber} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label="State" layout='vertical'>
                              <Input value={property?.row?.state} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Street Address" layout='vertical' >
                              <Input value={property?.row?.streetAddress} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label="Zip Code" layout='vertical'>
                              <Input value={property?.row?.zipCode} disabled className='inp-new' />
                            </Form.Item>
                            <Form.Item label="Reviews" layout='vertical' >
                              <Input value={property?.row?.streetAddress} disabled className='inp-new' />
                            </Form.Item>
                          </Form>
                          <Form layout='inline' className='flex flex-align driver-details-form-header' >
                            <Form.Item label=" " layout='vertical' style={{flex:1}}>
                              <Button style={{width: '100%'}} onClick={()=>{updateStatus(property?.row?._id, 'approve')}}>
                                Approve
                              </Button>
                            </Form.Item>
                            <Form.Item label=" " layout='vertical'  style={{flex:1}}>
                              <Button style={{width: '100%'}} onClick={()=>{updateStatus(property?.row?._id, 'cancel')}}>
                                Cancel
                              </Button>
                            </Form.Item>
                            <Form.Item label=" " layout='vertical' style={{flex:1}} >
                              <Button style={{width: '100%'}} onClick={()=>{updateStatus(property?.row?._id, 'suspend')}}>
                                Suspend
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                  </div>))}
                </div>
        </div>
    </div>
  )
}

export default HousePropertiesDetails