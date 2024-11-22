import React, {useEffect, useState, useContext} from 'react';
import { Table, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import { MainContext } from '../../context/context';
import Axios from 'axios';
import './vendor.css'
const { Search } = Input;

const Shops = () => {
  const { baseUrl, token} = useContext(MainContext);
  const [shopListRawData, setShopListRawData] = useState([]);
  const [shopLists, setShopLists] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [searchLoad ,setSearchLoad] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const updateProductStatus = (shopId, newStatus) => {

    console.log('the shop is >>',shopId)
    // Make the API call to update the driver status
    Axios({
      method: 'put', // Assuming it's a PUT request to update the status
      url: `${baseUrl}vendor-food/admin-shop-${newStatus}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Accept": "*/*",
      },
      data: {
        shopId: shopId,
        message: 'hello'
      },
    })
    .then((res) => {
      console.log('the updated status >>>',res.data);
      message.success(`the product has been updated to ${newStatus}`)
      // Optionally, refetch the driver list after updating status
      fetchShopList();
    })
    .catch((err) => {
      console.error('Failed to update status', err);
      message.error(err.message)
    });
  };
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
    {
      title: 'Update Status',
      dataIndex: 'adminConsent',
      render: (_, record) => (
        <div style={{width: 300}}>
          <Button onClick={() => updateProductStatus(record?.userId, 'approve')} type="primary" style={{ marginRight: 8 }}
            disabled = {record?.adminConsent === 'approved'}
          >Approve</Button>
          <Button onClick={() => updateProductStatus(record?.userId, 'cancel')} type="primary" danger style={{ marginRight: 8 }}
           disabled = {record?.adminConsent === 'cancelled'} >Cancel</Button>
          <Button onClick={() => updateProductStatus(record?.userId, 'suspend')} type="default" className='orange-btn' disabled = {record?.adminConsent === 'suspended'}>Suspend</Button>
        </div>
      ),
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'cancelled', value: 'cancelled' },
        { text: 'Suspended', value: 'suspended' },
      ],
      onFilter: (value, record) => record.adminConsent === value,
    }
  ];

  const fetchShopList = async () =>
    {
      setIsLoading(true);
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
        
        setIsLoading(false);
        console.log(response.data?.data?.data)
      } catch (error) {
        console.error('the shop list error >>>', error)
        setIsLoading(false);
      }
    }

    useEffect(()=>{
      fetchShopList()
    }, []);
    
    useEffect(()=>{
      const processedData = shopListRawData?.map(item => ({
        ...item?.row,
        ...item?.userDetailsData,
        userId: item?.row?._id
      }));

      setShopLists(processedData);
      setFilteredData(processedData)
      console.log('shop list', shopLists)
    }, [shopListRawData])

    const handleRowClick = (admins) => {
      navigate(`/dashboard/vendor/shops/${admins.userId}`);
    };
    const handleSearch = (value) => {
      setSearchLoad(true);
      const filteredShops = shopLists.filter(driver =>
        driver?.name.toLowerCase().includes(value?.toLowerCase()) ||
        driver?.email.toLowerCase().includes(value?.toLowerCase()) 
      );
      setFilteredData(filteredShops);
      setSearchLoad(false);
    };
  return (
    <div style={{padding: 20}}>
      <h1 style={{fontSize: 35}}>Shops</h1>
      <div className="search-bar">
        <Search placeholder="Search by Name or email " enterButton="Search" size="large" loading = {searchLoad} onSearch={handleSearch} className='search-bar-search'/>
     </div>
      <Table style={{background: 'white', }} className="admin-table admin-table23 "   dataSource={filteredData} columns={column}  onRow={(admin) => ({
          onClick: () => handleRowClick(admin), 
        })} loading= {isLoading}/>
    </div>
  )
}

export default Shops