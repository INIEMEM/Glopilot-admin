import React, {useEffect, useContext, useState} from 'react'
import { Table, Badge, Image, message } from "antd";
import { fetchUserDetails } from '../../Utils/FetchUserDetails'
import { MainContext } from '../../context/context'
import { formatDate } from '../../Utils/Formatdate';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
const Message = () => {
  const {imgBaseUrl,baseUrl, token, setIsUnreadMessages, isUndreadMessages } = useContext(MainContext);
  const [messageList, setMessageList] = useState([])
  const [userDetails, setUserDetails] = useState([]);
  const [unReadMessagesCount, setUnReadMessagesCount] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);

  const navigate = useNavigate();
  // Function to check for unread messages
const checkUnreadMessages = (messagesListHolder) => {
  // Flatten all the adminMessages from each item in messagesListHolder
  
  const allAdminMessages = messagesListHolder
    .flatMap(item => item.data?.data?.adminMessages || []);

    
  // Check if any message is unread (i.e., isRead === false)
  const hasUnread = allAdminMessages.some(message => message.status === false);

  setIsUnreadMessages(hasUnread); // Save the result in state

  
};
  const getUnreadMessagesCount = async () =>
    {
      try {
        const messagesListHolder = await Promise.all(
          messageList.map(async (item) => {
          
           const respose = Axios({
            method: 'get',
            url: `${baseUrl}admin/message?userId=${item._id}`,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token,
              "Accept": "*/*",
            },
          })
            return respose;
          })
        )
      
        console.log('the mesage lis', messagesListHolder)
        setUnReadMessagesCount(messagesListHolder)
        // const unReadMessages = messagesListHolder?.data?.data?.adminMessages?.filter(message => message.status === false);
        checkUnreadMessages(messagesListHolder)
        
      } catch (error) {
        console.error('messages list holder >>>>', error)
      }

    }
  
  useEffect(()=>{
    getUnreadMessagesCount()
    
  }, [messageList])
  const fetchMessageList = async() =>
    {
      setMessageLoading(true)
      try {
        const response = await Axios({
          method: 'get', 
          url: `${baseUrl}admin/admins`, 
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Accept": "*/*",
          },
        })
        console.log(response.data)
        setMessageList(response.data?.admins)
        setMessageLoading(false)
      } catch (error) {
        console.log('message error >>>>>', error)
        setMessageLoading(false)
      }
    }
    const messageColumn = [
      {
        title: 'S/N',
        dataIndex: 'sn',
        render: ( text, record,index) => index + 1,
      },
      {
        title: 'Img',
        dataIndex: 'picture',
        render: (_, record, index) => (
          <Badge size="small" count={unReadMessagesCount[index]?.data?.data?.adminMessages?.filter(messages =>        messages.status === false).length}>
            <Image
              width={40}
              height={40}
              className='driver-profile-image'
              src={`${imgBaseUrl}${record?.profilePic}`} />
          </Badge>
        ),
      },
      {
        title: 'User Name',
        dataIndex: 'username',
        
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

        title: 'Date',
        dataIndex: 'createdAt',
        render: (text) => formatDate(text),
      },
      
    ]
   
  useEffect(()=>{
    fetchMessageList()
  }, [token])
  
  const handleRowClick = (admins) => {
    navigate(`/dashboard/messages/${admins._id}`, { state: { admins } });
  };

  
  return (
    <div style={{padding: '20px'}}>
      <h1>Messages</h1>
      <Table style={{background: 'white', }} className="admin-table admin-table23 " loading={messageLoading} dataSource={messageList} columns={messageColumn} onRow={(admin) => ({
          onClick: () => handleRowClick(admin), 
        })}/> 
    </div>
  )
}

export default Message