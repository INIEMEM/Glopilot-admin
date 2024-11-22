import  Axios  from 'axios'
import React, {useState, useEffect, useContext, useRef} from 'react'
import { useParams } from 'react-router-dom'
import { MainContext } from '../../context/context';
import { Image, Form, Input, Button, Tabs, Table, message } from 'antd';
import { motion } from 'framer-motion';
import { formatDate } from '../../Utils/Formatdate';
import LongCard2 from '../dashboard/Components/LongCard2';
const { TextArea } = Input;
const ShopDetails = () => {
  const { baseUrl, token , imgBaseUrl} = useContext(MainContext);
  const [shopListsDetails, setShopListsDetails] = useState([])
  const {shopId} = useParams();
  const itemHolderRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [isOverflowing, setIsOverFlowing] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({});

  const fetchShopDetails = async () =>
    {
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}vendor-food/admin-shop-food?shopId=${shopId}`,
        headers: {
          'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Accept": "*/*",
        }
      });


      setShopListsDetails(response.data?.data);
      const counts = response.data?.data?.products.reduce((acc, product) => {
        const category = product.productCategory;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
      setCategoryCounts(counts);

    }

    useEffect(()=>{
      fetchShopDetails()
    }, [])

    useEffect(()=> {
      console.log('shop details >>>', shopListsDetails);

      if(itemHolderRef.current && itemHolderRef.current.scrollHeight > 460)
        {
          setIsOverFlowing(true);
        }else
        {
          setIsOverFlowing(false)
        }


    }, [shopListsDetails])

    const toggleShowMore = () => {
      setShowMore(prevShowMore => !prevShowMore);
    };

    const updateProductStatus = (productId, newStatus) => {

      
      // Make the API call to update the driver status
      Axios({
        method: 'put', // Assuming it's a PUT request to update the status
        url: `${baseUrl}vendor-food/admin-shop-product-${newStatus}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Accept": "*/*",
        },
        data: {
          shopId: shopId,
          productId: productId
        },
      })
      .then((res) => {
        console.log('the updated status >>>',res.data);
        message.success(`the product has been updated to ${newStatus}`)
        // Optionally, refetch the driver list after updating status
        fetchShopDetails();
      })
      .catch((err) => {
        console.error('Failed to update status', err);
        message.error(err.message)
      });
    };
  
     const ordersColumn = [
      {
        title: 'S/N',
        dataIndex: 'sn',
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Img',
        dataIndex: 'images',
        render: (_, record) => (
          <Image.PreviewGroup
              items={
                record?.images?.map(imgs => (
                `${imgBaseUrl}${imgs}`
              ))
              }  
            >
              <Image
                width={30}
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png
                `}
                
              />
          </Image.PreviewGroup>
        ),
      }, 
      {
        title: 'Name',
        dataIndex: 'productName',
        render: (_, record) => (<p  style={{width: 300}}>{record?.productDescription}</p>)
      },
      {
        title: 'Description',
        dataIndex: 'productDescription',
        render: (_, record) => (<TextArea style={{background: 'white', width: 350}} value={record?.productDescription} disabled/>)
      }, 
       {
        title: 'Price',
        dataIndex: 'price'
      },
      {
        title: 'Discount Price',
        dataIndex: 'discountPrice'
      },
      {
        title: 'Brand',
        dataIndex: 'brand'
      },
      {
        title: 'Category',
        dataIndex: 'productCategory'
      },
      {
        title: 'Status',
        dataIndex: 'status'
      },
      {
        title: 'AdminConsent',
        dataIndex: 'adminConsent'
      },
      {
        title: 'Update Status',
        dataIndex: 'adminConsent',
        render: (_, record) => (
          <div style={{width: 300}}>
            <Button onClick={() => updateProductStatus(record?._id, 'approve')} type="primary" style={{ marginRight: 8 }}
              disabled = {record?.adminConsent === 'approved'}
            >Approve</Button>
            <Button onClick={() => updateProductStatus(record?._id, 'cancel')} type="primary" danger style={{ marginRight: 8 }}
             disabled = {record?.adminConsent === 'cancelled'} >Cancel</Button>
            <Button onClick={() => updateProductStatus(record?._id, 'suspend')} type="default" className='orange-btn' disabled = {record?.adminConsent === 'suspended'}>Suspend</Button>
          </div>
        ),
        filters: [
          { text: 'Approved', value: 'approved' },
          { text: 'cancelled', value: 'cancelled' },
          { text: 'Suspended', value: 'suspended' },
        ],
        onFilter: (value, record) => record.adminConsent === value,
      },
       {
        title: 'Date',
        dataIndex: 'updateAt',
        render: (_, record) =>(
          <p style={{width: 200}}>{formatDate(record?.createdAt)}</p>
        )
      },

    ]

    const filterProductsByCategory = (category) => {
      return shopListsDetails.products?.filter(product => product.productCategory === category) || [];
    };
    
    const columns = [
      {
        title: 'Day',
        dataIndex: 'day',
        key: 'day',
      },
      {
        title: 'Opening Time',
        dataIndex: 'fromTime',
        key: 'fromTime',
      },
      {
        title: 'Closing Time',
        dataIndex: 'toTime',
        key: 'toTime',
      },
    ];
  return (
    <div style={{padding: 20}}>
      {/* Product details section */}
      <motion.section className='shopdetails-div' ref={itemHolderRef}
        initial={{ height: 'auto' }}
        animate={{ height: showMore ? 'auto' : '460px' }}
        transition={{ type: 'tween', duration: 0.8 }}
        style={{
          overflow: showMore ? 'visible' : 'hidden',
        }}>
        <h1 style={{marginBottom: 20}}>Product Details</h1>
        
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane key="1" tab={`Food (${categoryCounts['Food'] || 0})`} children={<LongCard2 content={<Table className="admin-table admin-table23 try-table" dataSource={filterProductsByCategory('Food')} columns={ordersColumn} />} />} />
          <Tabs.TabPane key="2" tab={`Groceries (${categoryCounts['Groceries'] || 0})`}  children={<LongCard2 content={<Table className="admin-table admin-table23 try-table"dataSource={filterProductsByCategory('Groceries')} columns={ordersColumn} />} />} />
          <Tabs.TabPane key="3" tab={`Alcohol (${categoryCounts['Alcohol'] || 0})`} children={<LongCard2 content={<Table className="admin-table admin-table23 try-table"dataSource={filterProductsByCategory('Alcohol')} columns={ordersColumn} />} />} />
          <Tabs.TabPane key="4" tab={`Babies (${categoryCounts['Babies'] || 0})`} children={<LongCard2 content={<Table className="admin-table admin-table23 try-table" dataSource={filterProductsByCategory('Babies')} columns={ordersColumn} />} />} />
          <Tabs.TabPane key="5" tab={`Special (${categoryCounts['Special'] || 0})`} children={<LongCard2 content={<Table className="admin-table admin-table23 try-table"dataSource={filterProductsByCategory('Special')} columns={ordersColumn} />} />} />
        </Tabs>

        {isOverflowing && (
              <Button className='show-more-btn' onClick={toggleShowMore} >
                {showMore ? 'Show Less' : 'Show More'}
              </Button>
            )}
      </motion.section>
      <section className='shopdetails-div'>
          <h1>User Details</h1>
          {
          (shopListsDetails?.userDetailsData) && (<div className='flex' style={{gap: 20}}>
            <Image
              width={300}
              src={`${imgBaseUrl}${shopListsDetails?.userDetailsData?.profilePic}
              `}
              className='shopdetails-img'
            />
            <div>
              <Form layout='inline' className='flex flex-center driver-details-form-header' >
                    <Form.Item label="Name" layout='vertical' >
                      <Input value={shopListsDetails?.userDetailsData?.name} disabled className='inp-new' />
                    </Form.Item>
                    <Form.Item label=" Email" layout='vertical' >
                  <Input value={shopListsDetails?.userDetailsData?.email} disabled className='inp-new' />
                </Form.Item>
                    
              </Form>
              <Form layout='inline' className='flex flex-center driver-details-form-header' >
                <Form.Item label="Home Address" layout='vertical' >
                  <Input value={shopListsDetails?.userDetailsData?.homeAddress} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label=" Work Address" layout='vertical' >
                  <Input value={shopListsDetails?.userDetailsData?.workAddress} disabled className='inp-new' />
                </Form.Item>
                
              </Form>
              <Form layout='inline' className='flex flex-center driver-details-form-header' >
                <Form.Item label="User Type" layout='vertical' >
                  <Input value={shopListsDetails?.userDetailsData?.userType} disabled className='inp-new' />
                  
                </Form.Item>
                
                <Form.Item label=" Wallet Balance" layout='vertical' >
                  <Input value={shopListsDetails?.userDetailsData?.walletBalance} disabled className='inp-new' />
                </Form.Item>
                
              </Form>
              <Form layout='inline' className='flex flex-center driver-details-form-header' >
                <Form.Item label=" Phone Number" layout='vertical' >
                  <Input value={shopListsDetails?.userDetailsData?.phoneNumber} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label=" Gender" layout='vertical' >
                  <Input value={shopListsDetails?.userDetailsData?.gender} disabled className='inp-new' />
                </Form.Item>
              </Form>
              <Form layout='inline' className=' driver-details-form-header' >

              <Form.Item label=" Date of Birth" layout='vertical' >
                  <Input value={shopListsDetails?.userDetailsData?.dob} disabled className='inp-new' />
                </Form.Item>
              </Form>
            </div>
          </div>)
        }
      </section>
      <motion.section className='shopdetails-div'>
          <h1>Vendor Details</h1>
          {   
            <div>
              <Form layout='inline' className=' driver-details-form-header' >
                <Form.Item label="Name" layout='vertical' >
                  <Input value={shopListsDetails?.vendorShop?.name} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label=" Email" layout='vertical' >
                  <Input value={shopListsDetails?.vendorShop?.emailAddress} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label=" Phone Number" layout='vertical' >
                  <Input value={shopListsDetails?.vendorShop?.phone} disabled className='inp-new' />
                </Form.Item>   
              </Form>
              <Form layout='inline' className=' driver-details-form-header' >
                <Form.Item label=" Address" layout='vertical' >
                  <Input value={shopListsDetails?.vendorShop?.address} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label=" City" layout='vertical' >
                  <Input value={shopListsDetails?.vendorShop?.city} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label=" Country" layout='vertical' >
                  <Input value={shopListsDetails?.vendorShop?.country} disabled className='inp-new' />
                </Form.Item>
              </Form>
              <Form layout='inline' className=' driver-details-form-header' >
                <Form.Item label="State" layout='vertical' >
                  <Input value={shopListsDetails?.vendorShop?.state} disabled className='inp-new' />
                  
                </Form.Item>
                
                <Form.Item label=" Admin Consent" layout='vertical' >
                  <Input value={shopListsDetails?.vendorShop?.adminConsent} disabled className='inp-new' />
                </Form.Item>
                <Form.Item label=" Admin Consent Message" layout='vertical' >
                  <Input value={shopListsDetails?.vendorShop?.adminConsentMessage} disabled className='inp-new' />
                </Form.Item>
                
              </Form>
              <Form layout='inline' className='driver-details-form-header' >
                <Form.Item label=" Business logo" layout='vertical' >
                <Image
                  width={300}
                  src={`${imgBaseUrl}${shopListsDetails?.vendorShop?.business_logo[0]?.image}
                  `}
                  className='shopdetails-img'
                />
                </Form.Item>
                <Form.Item label=" Business license" layout='vertical' >
                  <Image
                    width={300}
                    src={`${imgBaseUrl}${shopListsDetails?.vendorShop?.business_license[0]?.image}
                    `}
                    className='shopdetails-img'
                  />
                </Form.Item>
                <Form.Item label=" Profile Picture" layout='vertical'>

                <Image
                  width={300}
                  src={`${imgBaseUrl}${shopListsDetails?.vendorShop?.profile_image[0]?.image}
                  `}
                  className='shopdetails-img'
                />
                </Form.Item>
              </Form>
              <Form layout='inline' className=' driver-details-form-header' >

              <Form.Item label=" cnic back image" layout='vertical' >
                  <Image
                    width={300}
                    src={`${imgBaseUrl}${shopListsDetails?.vendorShop?.cnic_back_image[0]?.image}
                    `}
                    className='shopdetails-img'
                  /> 
              </Form.Item>
              <Form.Item label=" cnic front image" layout='vertical' >
                  <Image
                    width={300}
                    src={`${imgBaseUrl}${shopListsDetails?.vendorShop?.cnic_front_image[0]?.image}
                    `}
                    className='shopdetails-img'
                  /> 
              </Form.Item>
              <Form.Item label=" tax certificate" layout='vertical' >
                <Image
                  width={300}
                  src={`${imgBaseUrl}${shopListsDetails?.vendorShop?.tax_certificate[0]?.image}
                  `}
                  className='shopdetails-img'
                /> 
              </Form.Item>
                
              </Form>

              <h3 style={{marginTop: 10, color: '#333'}}>Opening Hours</h3>
              <Table
              className="admin-table"
              dataSource={shopListsDetails?.vendorShop?.openHours?.map((hour) => ({ ...hour, key: hour._id }))}
              columns={columns}
              pagination={false}
            />
            </div>
    
        }
      </motion.section>
    </div>
  )
}

export default ShopDetails