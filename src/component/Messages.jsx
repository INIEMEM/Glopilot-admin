import { useState, useEffect, useContext,  } from "react";
import { Image,  Input, Form, Button,  Dropdown,  Popover, Mentions, message, Popconfirm} from 'antd';
import UserDetails from "./rentals/Components/UserDetails";
import { fetchUserDetails } from "../Utils/FetchUserDetails";
import { MainContext } from "../context/context";
import Axios from 'axios';
import imagePath from './assets/pics.png';
import { label } from "framer-motion/client";
const { getMentions } = Mentions;
const Messages = ({messageArray, bookingId}) => {
  const {  imgBaseUrl,baseUrl, token, reportDetails } = useContext(MainContext);
  const [loading, setLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [vendorDetails, setVendorDetails] = useState([]);
  const [profilePics, setProfilePics] = useState([]);
  //  console.log('the message array',messageArray)

  
   useEffect(() => {
    // Fetch profile pictures for each receiverId in messageArray
    const fetchProfilePictures = async () => {
      const userData = await Promise.all(
        messageArray.map(async (item) => {
          const userDetails = await fetchUserDetails(item.receiverId, token, baseUrl);
          return userDetails;
        })
      );
      setUserDetails(userData);
    };

    if (messageArray?.length > 0) {
      fetchProfilePictures();
    }
  }, [messageArray, token, baseUrl]);

  const [form] = Form.useForm();
  // This will reset the form
  const onReset = () => {
    form.resetFields();
  };
  const onChange = (value) => {
    console.log('Input Value Changed:', value); // This shows the input field value as the user types
  };
  
  const onSelect = (option) => {
    console.log('User Selected:', option.value); // This shows the selected user's value
    setSelectedUser(option.value);
  };
  //This would help submit the function
  const onFinish = async (values) => 
    {
    setLoading(true)
    try {
    const response = await  Axios({
        method: 'post',
        url: `${baseUrl}vendor-carowner/admin-carrent-notice-${selectedUser}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Accept": "*/*",
        },
        data:{
          bookingId: bookingId,
          message: values.message
        },
          
      });
      console.log(response?.data);
      message.success('message sent to ',selectedUser, ' successfully');
      setLoading(false);
    } catch (error) {
      message.error(error.response?.data?.message);
      console.log(typeof bookingId)
      console.log('login error',error);
      setLoading(false);
    }
    
  
  };
  const checkMention = async (_, value) => {
    const mentions = getMentions(value);
    if (mentions.length < 1) {
      throw new Error('A User must be selected!');
    }
  };
  const uniqueUserDetails = [...new Set(userDetails)]
  
  const userOptions = uniqueUserDetails.map((user, index)=>({
    value: `${user?.userType == 'guest' ? 'user': 'vendor'}`,
    label: `${user?.name} ${user.userType == 'guest' ? '(user)': '(vendor)'}`
  }))

  const updateButton = async (action) => 
    {
      setBtnLoading(true);
       try {
        const response = await  Axios({
          method: 'put',
          url: `${baseUrl}vendor-carowner/admin-car-rent-${action}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Accept": "*/*",
          },
          data:{
            bookingId: bookingId,
          },
            
        });
        setBtnLoading(false);
        message.success(`${action} success`)
       } catch (error) {
        message.error(`${action} error`)
        console.log('the refund btn error', error);
        setBtnLoading(false);
       }
    }
  return (
    <div style={{padding:15}}>
        <div className="Messages-section">
          <div className="message-holder  flex flex-column">
            {(messageArray?.length !== 0) && (
              messageArray?.map((item, index) => (<div key={index} className="flex flex-align message-holder-item">
                <Popover content={<UserDetails users = {userDetails[index]} />} title={`${userDetails[index]?.name}'s Details`} trigger="click">
                <img src={`${imgBaseUrl}${userDetails[index]?.profilePic}`} className="msg-img"/>
                  
                </Popover> 
                {item.data[0].chatType == 'text' && <Input className="msg-inp" value={item.data[0].chatData} />}
                {item.data[0].chatType == 'image' && <Input className="msg-inp" value={item.data[0].chatData} />}
                
                <span className="msg-time">{item.createdAt}</span>
              </div>)))}
            {/* <div className="flex flex-align message-holder-item message-holder-item-admin flex-justify-end ">
              <Input className="msg-inp msg-inp-admin" value='I do not like your services they are very very poor' disabled/>
              <Popover content={<UserDetails/>} title="Title" trigger="click">
                <img src={``} className="msg-img"/>
              </Popover> 
            </div> */}
            <div className="msg-refund-user-holder">
            <Popconfirm
              title="Payout Vendor"
              description="Are you sure you want to Payout this vendor?"
              onConfirm={()=> updateButton('payout')}
              okText="Yes"
              cancelText="No"
            >
               <Button loading={btnloading}>Vendor Payout</Button>
            </Popconfirm>
            <Popconfirm
              title="Refund Vendor"
              description="Are you sure you want to Refund this vendor?"
              onConfirm={()=> updateButton('refund')}
              okText="Yes"
              cancelText="No"
            >

            <Button loading={btnloading}>Refund Vendor</Button>
            </Popconfirm>
          </div>
          </div>
          
          <div className="admins-send-message-holder">
            <Form layout='inline' onFinish={onFinish} onReset={onReset}>
                <Form.Item
                  name='message'
                  rules={[
                    {
                      validator: checkMention,
                    },
                  ]}
                  
                  wrapperCol={{
                    span: 16,
                  }}
                >
                  <Mentions onSelect={onSelect} onChange={onChange} rows={3} placeholder="You can use @ to ref user here" options={userOptions} className="mention-input"
                  
                  />
                </Form.Item>
                <Form.Item><Button htmlType="submit" type="primary" className="send-message-btn" loading={loading}>Send Notice</Button></Form.Item>
            </Form>
          </div>
        </div>
    </div>
  )
}

export default Messages