import React from 'react'
import Axios from 'axios';
import { fetchUserDetails } from '../../Utils/FetchUserDetails';
import { formatDate } from '../../Utils/Formatdate';
import { MainContext } from '../../context/context';
import { useState, useEffect, useContext,  } from "react";
import { Image,  Input, Form, Button,  Upload, Empty, message} from 'antd';
import UserDetails from '../rentals/Components/UserDetails';
import { useParams, useNavigation, useLocation } from 'react-router-dom';
import './message.css'
import { div } from 'framer-motion/client';
const MessagesItem = () => {
  const [messageArray, setMessageArray] = useState([]);
  const [senderId, setSenderId] = useState('')
  const {  imgBaseUrl,baseUrl, token, currentUser } = useContext(MainContext);
  const {messagesId} = useParams()
  const location = useLocation();
  const { admins } = location.state || {};
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  console.log('admin detioals .', admins)
  const fetchMessages = async () => {
    try {
      const resoponse = await Axios({
      method: 'get',
      url: `${baseUrl}admin/message?userId=${messagesId}`,
      headers:
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Accept": "*/*",
      }
    });

    console.log('fetch message data >>>', resoponse.data);
    setMessageArray(resoponse.data?.data?.adminMessages)
    setSenderId(resoponse.data.data.adminMessages[0].senderId);
    } catch (error) {
      console.error('fetch message data >>>', error)
    }
  }

  useEffect(()=>{
    fetchMessages()
  }, [])
  const onFinish = async (values) => 
    {
      setLoading(true)
      try {
        const response = await Axios({
          method: 'post',
          url: `${baseUrl}admin/send-text-message`,
          headers:{
            'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Accept": "*/*",
          },
          data:{
            userId: admins?._id,
            message: values.message
          }
        })
        console.log('message sent >>>', response.data);
        message.success('Message sent ');
        setLoading(false)
        form.resetFields();
      } catch (error) {
        console.error('message sent error', error);
        setLoading(false);
      }
    };
    // Handle profile picture change
  const handleProfilePictureChange = async (info) => {
    const file = info.file;

    if (!file) {
      message.error('No file selected!');
      return;
    }
    
    
    const formData = new FormData();
    formData.append('profilePicture', file);
    const profilePicture = formData.get('profilePicture');
    console.log(profilePicture)

    
    try {
      setLoading(true);
      const response = await Axios({
        method: 'post',
        url: `${baseUrl}admin/send-file-message`,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        },
        data: {
          userId: senderId,
          messageType: 'images',
          photos: profilePicture
        },
      });
      message.success('fie sent');
      // Assuming the response contains the new picture URL
      console.log(response.data)
    } catch (error) {
      // message.error('Failed to update profile picture');
      console.log('profile pics',error)
    }
    
  };
  return (
    <div style={{padding:15}}>
    <div className="Messages-section message-holder-m ">
      <div className="message-user-name flex flex-justify-between flex-align " >
        <div className='flex' style={{gap:10}}>
          <div className='message-user-name-img'>
            <Image src={`${imgBaseUrl}${admins.profilePic}`} style={{borderRadius: '50%'}} width={40} height={40}/>
           </div>  
          <h1 className='message-text-header'>{admins.name}</h1>
        </div>
        <div>
        <Upload
            name="profilePicture"
            showUploadList={false}
            beforeUpload={() => false} // Disable automatic upload
            onChange={handleProfilePictureChange}
            
            className="uploadimg"
          >
            <i class="fa-solid fa-image" style={{fontSize: 25}}></i>
          </Upload>
          
        </div>
      </div>
      <div className="message-holder message-holders  flex flex-column">
        
        {(messageArray?.length !== 0) ? (
          messageArray?.map((item, index) => (
            currentUser.adminId !== item.senderId ?
          (<div key={index} className="flex flex-align message-holder-item ">
            
            {item.data[0].chatType == 'text' && <Input className="msg-inp" value={item.data[0].chatData} />}
            {item.data[0].chatType == 'image' && <Image style={{objectFit:'cover'}}  src={`${imgBaseUrl}${item.data[0].chatData}`}/>}
            
            <span className="msg-time">{formatDate(item.createdAt)}</span>
          </div>): (<div className="flex flex-align message-holder-item message-holder-item-admin flex-justify-end ">
            <span className="msg-time">{formatDate(item.createdAt)}</span>
          {item.data[0].chatType == 'text' && <Input className="msg-inp msg-inp-admin" value={item.data[0].chatData} />}
          {item.data[0].chatType == 'images' && <Image style={{objectFit:'cover'}} width='20%' height={320}  src={`${imgBaseUrl}${item.data[0].chatData}`}/>}
        </div>)
        ))) : (<div className='flex flex-center'><Empty description={false} /></div>)}
        
       
        
      </div>
      
      <div className="admins-send-message-holder">
        <Form layout='inline' form={form} onFinish={onFinish} >
            <Form.Item
              name='message'
              wrapperCol={{
                span: 16,
              }}
            >
              <Input className='message-inp' style={{with: 'calc(100vw - 190px)', height: '75px'}}/>
            </Form.Item>
            <Form.Item><Button htmlType="submit" type="primary" className="send-message-btn end-message-btn"  disabled={loading}>Send message</Button></Form.Item>
        </Form>
      </div>
    </div>
</div>
  )
}

export default MessagesItem