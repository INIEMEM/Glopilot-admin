import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../../context/context';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Image, message, Button } from 'antd';
import Axios from 'axios';
import { fetchUserDetails } from '../../Utils/FetchUserDetails';

const HotelNoticeDetails = () => {
  const { imgBaseUrl, baseUrl, token } = useContext(MainContext);
  const [noticeData, setNoticeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { hotelNotice } = useParams();

  // Fetch reservation notice and user details
  const fetchReservationNotice = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}vendor-hotel/admin-reservation-notice?reservationId=${hotelNotice}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          Accept: '*/*',
        },
      });

      const notices = response.data?.data?.data[0]?.notice || [];

      // Fetch user details for each notice
      const updatedNotices = await Promise.all(
        notices.map(async (notice) => {
          const user = await fetchUserDetails(notice.userId, token, baseUrl);
          return {
            ...notice,
            userName: user?.name || 'Unknown',
            profilePicture: user?.profilePic
            || '', // Assume the response contains a profile picture URL
          };
        })
      );

      setNoticeData(updatedNotices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reservation notice:', error);
      message.error('Failed to fetch notices');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservationNotice();
  }, []);

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
  const navigate = useNavigate(); 
  const handleRowClick = (admins) => {
    navigate(`/dashboard/hotel/notice/send`, {
      state: { reservationId:hotelNotice },
    });
  };

  const handleUpdates = async (stat) =>
    {
      const endpoint =  stat === 'pay' ? 'vendor-house/admin-pay-hospitality': 'vendor-house/admin-refund-user'

      try {
        const response = await Axios({
          method: 'put',
          url: `${baseUrl}${endpoint}`,
          headers: 
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            Accept: '*/*',
          },
          data:
          {
            reservationId: hotelNotice
          }
        })

        console.log(response.data)
      } catch (error) {
        console.error('put request',error)
      }


    }
  return (
    <div style={{padding: 20}}>
      <div style={{gap: 10}} className='flex flex-align'>
        <Button onClick={()=> handleUpdates('pay')} style={{flex:1, height: 50}}>Pay hospitality</Button>
        <Button style={{flex:1, height: 50}} onClick={()=> handleUpdates('refund')}>Refund User</Button>
      </div>
      <Table
        columns={columns}
        dataSource={noticeData}
        rowKey={(record) => record.id || record.userId}
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="admin-table "
        onRow={(admin) => ({
          onClick: () => handleRowClick(admin), 
        })} 
      />
    </div>
  );
};

export default HotelNoticeDetails;
