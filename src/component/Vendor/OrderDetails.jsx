  import  Axios  from 'axios';
  import React, {useContext, useState, useEffect, useRef} from 'react'
  import { MainContext } from '../../context/context';
  import { useParams } from 'react-router-dom'
  import { Image, Form, Input, Button, Typography, Table, Popover, Mentions, message,  Empty } from 'antd';
  import { motion } from 'framer-motion';
  import { formatDate } from '../../Utils/Formatdate';
  import LongCard2 from '../dashboard/Components/LongCard2';
  import {
    APIProvider,Map,AdvancedMarker,Pin,InfoWindow,} from "@vis.gl/react-google-maps";
  import { div } from 'framer-motion/client';
  import { fetchUserDetails } from '../../Utils/FetchUserDetails';
  const { TextArea } = Input;
  const { getMentions } = Mentions;
  const OrderDetails = () => {
    const {orderId} = useParams();
    const { baseUrl, token , imgBaseUrl, googleApiKey} = useContext(MainContext);
    const [shopListsDetails, setShopListsDetails] = useState(null);
    const [btnloading, setBtnLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const itemHolderRef = useRef(null);
    const [showMore, setShowMore] = useState(false);
    const [isOverflowing, setIsOverFlowing] = useState(false);
    const [categoryCounts, setCategoryCounts] = useState({});
    const [userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchShopDetails = async () =>
      {
        setLoading(true);
        try {
          const resposne = await Axios({
            method: 'get',
            url: `${baseUrl}vendor-food/admin-food-order?orderId=${orderId}`,
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
              "Accept": "*/*",
            }
          })
    
          console.log('the order details data >>',resposne.data)
          setShopListsDetails(resposne.data?.data || []);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching shop details:', error);
          setLoading(false);
        }
      } 
      useEffect(()=>{
        fetchShopDetails()
      }, [])
    
      const columns = [
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Time',
          dataIndex: 'time',
          key: 'fromTime',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
      ];
      const checkMention = async (_, value) => {
        const mentions = getMentions(value);
        if (mentions.length < 1) {
          throw new Error('A User must be selected!');
        }
      };
      const onSelect = (option) => {
        console.log('User Selected:', option.value); // This shows the selected user's value
        setSelectedUser(option.value);
      };
      const onChange = (value) => {
        console.log('Input Value Changed:', value); // This shows the input field value as the user types
      };
    const uniqueUserDetails = [...new Set(userDetails)]
    
    const userOptions = uniqueUserDetails.map((user, index)=>({
      value: `${user?.userType == 'guest' ? 'user': 'vendor'}`,
      label: `${user?.name} ${user.userType == 'guest' ? '(user)': '(vendor)'}`
    }))

    const updateOrder = async (update) => 
      {
        try {
          const response = await Axios({
          method: 'put',
          url: `${baseUrl}vendor-food/admin-food-order-return${update}`,
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Accept": "*/*",
          },
          data: {
            shopId: shopListsDetails?.carts?.shopId,
            productId: shopListsDetails?.product?._id
          }
        })
        message.success('success')
        console.log('response data ',response.data)
        } catch (error) {
          console.error('update error >>>>', error);
          message.error('an error has occoured')
        }
      }

      if (loading) {
        return <div>Loading...</div>;
      }
    return shopListsDetails ? (<div style={{padding: 20}}>
          <h1 style={{fontSize: 35}}>{shopListsDetails?.userDetailsData?.name}'s Order Details</h1>
          <div className='flex' style={{gap:30, marginTop:10}}>
            <div className="order-cart-cards">
              <h2 className='flex flex-center'>User Details</h2>
              <Form layout='inline' className=' driver-details-form-header' style={{padding: 15}} >
                <Form.Item label="Name" layout='vertical' >
                    <Input value={shopListsDetails?.userDetailsData?.name} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label="Email" layout='vertical' >
                    <Input value={shopListsDetails?.userDetailsData?.email} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label="Phone Number" layout='vertical' >
                    <Input value={shopListsDetails?.userDetailsData?.phoneNumber} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label="Home Address" layout='vertical' >
                    <Input value={shopListsDetails?.userDetailsData?.homeAddress} disabled className='inp-new' />
                </Form.Item>
              </Form>
            </div>
            <div className="order-cart-cards">
              <h2 className='flex flex-center '>Cart Details</h2>
              <Form layout='inline' className=' driver-details-form-header' style={{padding: 15}} >
                <Form.Item label="Delivery Mode" layout='vertical' >
                    <Input value={shopListsDetails?.carts?.deliveryMode} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label="Quantity" layout='vertical' >
                    <Input value={shopListsDetails?.carts?.quantity} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label="Total Cost" layout='vertical' >
                    <Input value={shopListsDetails?.carts?.totalCost} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label="Payment Status" layout='vertical' >
                    <Input value={shopListsDetails?.carts?.paymentStatus} disabled className='inp-new' />
                </Form.Item>
              </Form>
            </div>
            <div className="order-cart-cards">
            <h2 className='flex flex-center'>Vendor Details</h2>
              <Form layout='inline' className=' driver-details-form-header' style={{padding: 15}} >
                <Form.Item label="Name" layout='vertical' >
                    <Input value={shopListsDetails?.vendorDetailsData?.name} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label="Email" layout='vertical' >
                    <Input value={shopListsDetails?.vendorDetailsData?.email} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label="Phone Number" layout='vertical' >
                    <Input value={shopListsDetails?.vendorDetailsData?.phoneNumber} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label="Home Address" layout='vertical' >
                    <Input value={shopListsDetails?.vendorDetailsData?.homeAddress} disabled className='inp-new' />
                </Form.Item>
              </Form>
            </div>
          </div>
          <section className='shopdetails-div' style={{marginTop: 20}}>
            <h1>Product Details</h1>
            {
            (shopListsDetails?.userDetailsData) && (<div className='flex' style={{gap: 20}}>
              <Image
                width={300}
                src={`${imgBaseUrl}${shopListsDetails?.product?.images[0]}
                `}
                className='shopdetails-img'
              />
              <div>
                <Form layout='inline' className='flex flex-center driver-details-form-header' >
                      <Form.Item label="Brand" layout='vertical' >
                        <Input value={shopListsDetails?.product?.brand} disabled className='inp-new' />
                      </Form.Item>
                      <Form.Item label=" Product Category" layout='vertical' >
                    <Input value={shopListsDetails?.product?.productCategory} disabled className='inp-new' />
                  </Form.Item>
                      
                </Form>
                <Form layout='inline' className='flex flex-center driver-details-form-header' >
                  <Form.Item label="Product Description" layout='vertical' >
                    <Input value={shopListsDetails?.product?.productDescription} disabled className='inp-new' />
                  </Form.Item>
                  <Form.Item label=" Product Name" layout='vertical' >
                    <Input value={shopListsDetails?.product?.productName} disabled className='inp-new' />
                  </Form.Item>
                  
                </Form>
                <Form layout='inline' className='flex flex-center driver-details-form-header' >
                  <Form.Item label="Quantity" layout='vertical' >
                    <Input value={shopListsDetails?.product?.quantity} disabled className='inp-new' />
                    
                  </Form.Item>
                  
                  <Form.Item label=" weight" layout='vertical' >
                    <Input value={shopListsDetails?.product?.weight} disabled className='inp-new' />
                  </Form.Item>
                  
                </Form>
                <Form layout='inline' className='flex flex-center driver-details-form-header' >
                  <Form.Item label=" Discount Price" layout='vertical' >
                    <Input value={shopListsDetails?.product?.discountPrice} disabled className='inp-new' />
                  </Form.Item>
                  <Form.Item label=" Price" layout='vertical' >
                    <Input value={shopListsDetails?.product?.price} disabled className='inp-new' />
                  </Form.Item>
                </Form>
                <Form layout='inline' className=' driver-details-form-header' >

                <Form.Item label=" Status" layout='vertical' >
                    <Input value={shopListsDetails?.product?.status} disabled className='inp-new' />
                  </Form.Item>
                </Form>
              </div>
            </div>)
          }
        </section>
        <section className='shopdetails-div' style={{marginTop: 20}}>
            <h1>Delivery Details</h1>
            {
            (shopListsDetails?.delivery) && shopListsDetails?.delivery?.map(delivery => ( <div className='' > 
              <Table
                className="admin-tables"
                dataSource={delivery?.deliveryStatus?.flat()}
                columns={columns}
                pagination={false}
              />
              <Form layout='inline' className='flex  driver-details-form-header' >
                    <Form.Item label="Tracking Id" layout='vertical' style={{flex:1}}>
                      <Input value={delivery?.trackingId} disabled className='inp-new' style={{width: '100%'}} />
                    </Form.Item>
                    <Form.Item label="Delivery Price" layout='vertical' style={{flex:1}}>
                  <Input value={delivery?.deliveryPrice} disabled className='inp-new' style={{width: '100%'}} />
                </Form.Item>
                    
              </Form>
              <Form layout='inline' className='flex  driver-details-form-header' >
                <Form.Item label="Delivery Distance" layout='vertical' style={{flex:1}}>
                  <Input value={delivery?.deliveryDuration[0].distance} disabled className='inp-new' style={{width: '100%'}} />
                </Form.Item>
                <Form.Item label="Delivery Time" layout='vertical' style={{flex:1}}>
                  <Input value={delivery?.deliveryDuration[0].time} disabled className='inp-new' style={{width: '100%'}} />
                </Form.Item>
                    
              </Form>
              <h3 style={{
                marginTop: 10
              }}>Current Location </h3>
              <APIProvider  apiKey={googleApiKey}>
              <div style={{height: 200}}>
              <Map
                zoom={9}
                center={{
                lat: parseFloat(delivery?.currentLocationId[0]?.lat),
                lng: parseFloat(delivery?.currentLocationId[0]?.long),
                }}
                />

              </div>
              </APIProvider>
              <h3 style={{
                marginTop: 10
              }}>where To & From </h3>
              <APIProvider  apiKey={googleApiKey}>
              <div style={{height: 200}}>
              <Map
                zoom={9}
                center={{
                lat: parseFloat(delivery?.currentLocationId[0]?.lat),
                lng: parseFloat(delivery?.currentLocationId[0]?.long),
                }}
                />

              </div>
              </APIProvider>
          </div>))
          
          }
        </section>
        <section className='shopdetails-div' style={{marginTop: 20}}>
            <h1>Pickup Details</h1>
          {
            shopListsDetails?.pickup?.map(pickup => (
              <Form layout='inline' className='flex  driver-details-form-header' >
                <Form.Item label=" From where" layout='vertical' style={{flex: 1}} >
                    <Input value={pickup?.fromWhere[0]?.address} disabled className='inp-new' style={{width: '100%'}}/>
                </Form.Item>
              </Form>
            ))
          } 
        </section>
        <section>
        <div className="Messages-section">
          <h2>Messages</h2>
            <div className="message-holder  flex flex-column">
              {(shopListsDetails.messages?.length > 0) ? (
                shopListsDetails.messages?.map((item, index) => (<div key={index} className="flex flex-align message-holder-item">
                  
                  {item.data[0].chatType == 'text' && <Input className="msg-inp" value={item.data[0].chatData} />}
                  {item.data[0].chatType == 'image' && <Input className="msg-inp" value={item.data[0].chatData} />}
                  
                  <span className="msg-time">{item.createdAt}</span>
                </div>))): (<div>No Messages</div>)}
              
            </div>
            
          
          </div>
        </section>
        <div className='flex' style={{gap:20}}>
          <Button type='primary' style={{flex:1}}  onClick={()=> updateOrder('')}>Order Return</Button>
          <Button type='primary' danger style={{flex:1}} onClick={()=> updateOrder('-cancel')}>Order Cancel</Button>
          <Button style={{background: 'green', color: 'white', flex: 1}} onClick={()=> updateOrder('-approve')}>Order Approve</Button>
        </div>
      </div>): (< Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={
        <Typography.Text>
          No Data here
        </Typography.Text>
      }
      ></Empty>)
    
  }

  export default OrderDetails