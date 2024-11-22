import { useState, useEffect, useContext,  } from "react";
import { Image,  Input, Form, Button,  Dropdown,  Popover, Mentions, message, } from 'antd';
import { fetchUserDetails } from "../../../Utils/FetchUserDetails";
import { MainContext } from "../../../context/context";
const UserDetails = ({users}) => {
  const {  imgBaseUrl,baseUrl, token, reportDetails } = useContext(MainContext);
  // const [user, setUser] = useState([]);
  
  console.log('the user', users);
  // useEffect(()=>{
  //   fetchUserDetails(userId, token, baseUrl).then(res=> {
  //     setUser(res);
  //   })

  // }, [])
  return (
    <div>
      <div className="flex flex-center"><Image src={`${imgBaseUrl}${users.profilePic}`} style={{width: 65, height: 65, borderRadius: '50%', marginBottom: 10}}/></div>
      <Form >
      <Form.Item
        name='message'
        label = 'Phone Number'
        
      >
        <div className="msg-lbl">{users.phoneNumber}</div>
      </Form.Item>
      <Form.Item
        name='email'
        label = 'Email'
      >
        <div className="msg-lbl">{users.email}</div>
      </Form.Item>
      <Form.Item
        name='type'
        label = 'User Type'
      >
        <div className="msg-lbl">{users.userType}</div>
      </Form.Item>
      </Form>
    </div>
  )
}

export default UserDetails