import React, {useContext, useState, useEffect} from 'react'
import { MainContext } from '../../context/context';
import { Image, Form , Input, Table, Button, message} from 'antd';
import { fetchUserDetails } from '../../Utils/FetchUserDetails';
import Axios from 'axios';
const HotelNoticesAll = () => {
  const {  imgBaseUrl,baseUrl, token } = useContext(MainContext);
  const [noticeData, setNoticeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: 'S/N',
      dataIndex: 'sn',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Profile Picture',
      dataIndex: 'profilePicture',
      render: (profilePicture) =>
        profilePicture ? (
          <Image
            width={40}
            height={40}
            src={`${imgBaseUrl}${profilePicture}`}
            alt="Profile"
            style={{ borderRadius: '50%' }}
            
          />
        ) : (
          'No Image'
        ),
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
  ];
   const fetchReservationNotice = async () => 
    {
      try {
        const response = Axios({
          method: 'get',
          url: `${baseUrl}vendor-house/admin-reservations-notices`,
          headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            Accept: '*/*',
          },
          data: {
            
          }
        })
      } catch (error) {
        
      }
    }

  useEffect(() => {
    fetchReservationNotice();
  }, []);
  return (
    <div>
      <Table/>
    </div>
  )
}

export default HotelNoticesAll