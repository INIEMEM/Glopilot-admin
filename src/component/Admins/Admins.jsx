import { useEffect, useState, useContext } from "react";
import { MainContext } from "../../context/context";
import { Table, Input, Button, Image } from 'antd';
import { LoadingOutlined, UserAddOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'; 
import Axios from 'axios'
const { Search } = Input;
const Admins = () => {
  const [adminList, setAdminList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchLoad ,setSearchLoad] = useState(false);
  const {baseUrl, token, imgBaseUrl} = useContext(MainContext);
  const [dataLoad ,setDataLoad] = useState(false);
  const navigate = useNavigate(); 
  const getAdmins = async()=>

    {
      setDataLoad(true);
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
  
        console.log(response.data);
        setAdminList(response?.data?.admins);
        setFilteredData(response?.data?.admins)
        setDataLoad(false);
      } catch (error) {
        setDataLoad(false);
        console.error('Failed to update status', error);
      }
    }
  useEffect(()=>{
    getAdmins();

  }, [])

  

  const handleSearch = (value) => {
    setSearchLoad(true);
    const filteredDrivers = adminList.filter(admin =>
      admin?.name.toLowerCase().includes(value?.toLowerCase()) ||
      admin?.email.toLowerCase().includes(value?.toLowerCase()) 
    );
    setFilteredData(filteredDrivers);
    setSearchLoad(false);
  };
  const column = [
    
    {
      title: 'S/N',
      dataIndex: 'sn',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Img',
      dataIndex: 'profilePic',
      render: (_, record) => (
        <Image
            width={40}
            height={40}
            className='driver-profile-image'
            src={`${imgBaseUrl}${record.profilePic}`} />
      ),
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
      title: 'Role',
      dataIndex: 'role',
      filters: [
        { text: 'Vendor', value: 'vendor' },
        { text: 'Driver', value: "driver" },
        { text: 'Rental', value: 'rental' },
        { text: 'Hospitality', value: 'hospitality' },
      ],
      onFilter: (value, record) => record.role.includes(value),
      render: (roles) => roles?.slice(0, 2).join(', '),
    },
   
   
    {
      title: ' Status',
      dataIndex: 'adminConsent',
      
      filters: [
        { text: 'Approved', value: 'approved' },
        { text: 'Declined', value: 'declined' },
        { text: 'Suspended', value: 'suspended' },
      ],
      onFilter: (value, record) => record.adminConsent === value,
    },
     {
      title: 'Wallet Balance',
      dataIndex: 'walletBalance'
    },
    {
      title: 'Date',
      dataIndex: 'createdAt'
    },
  ];

  const handleRowClick = (admins) => {
    navigate(`/dashboard/all/admins/${admins._id}`);
  };
  if(adminList.length == 0){
    return(<LoadingOutlined />)
  }
  return (
    <div style={{padding: '0px 20px'}}>
      {/* <h2>All Admins</h2> */}
      <div className="search-bar flex flex-justify-between">
        <Search placeholder="Search by Name or email  "  size="large" loading = {searchLoad} onSearch={handleSearch} className="search-bar-search"/>
        <Button icon={<UserAddOutlined/>}><Link to='create/admin'>Create Admin</Link></Button>
     </div>
      <Table style={{background: 'white'}} className="admin-table" columns={column} dataSource={filteredData} loading = {dataLoad} onRow={(admin) => ({
          onClick: () => handleRowClick(admin), 
        })} />
    </div>
  )
}

export default Admins