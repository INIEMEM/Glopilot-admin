import { useState, useContext, useEffect } from "react";
import { Image, Form, Input, Button, message,Upload } from 'antd';
import { MainContext } from "../../context/context";
import ImgCrop from 'antd-img-crop';
import { Link } from "react-router-dom";
import Axios from 'axios';
import './profile.css';

const Profile = () => {
  const { currentUser, baseUrl, token,imgBaseUrl } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(currentUser?.profilePic || 'default_picture_url');
  console.log(currentUser) 
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phoneNumber: '',
    
    gender: '',
    homeAddress: '',
    pronouns: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  // Initialize the form with currentUser data when it changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        username: currentUser.user || '',
        phoneNumber: currentUser.phoneNumber || '',
        
        gender: currentUser.gender || '',
        homeAddress: currentUser.homeAddress || '',
        pronouns: currentUser.pronouns || ''
      });
      setProfilePic(currentUser.profilePic || 'default_picture_url');
    }
  }, [currentUser]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    setIsLoading(true);
    try {
      const response = await Axios({
        method: 'post',
        url: `${baseUrl}admin/picture`,
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'multipart/form-data'
        },
        data: {
          photo: profilePicture
        },
      });
      message.success('Profile picture updated');
      setProfilePic(response.data.photo); // Assuming the response contains the new picture URL
      console.log(response.data)
    } catch (error) {
      message.error('Failed to update profile picture');
      console.log('profile pics',error)
    }
    setIsLoading(false);
  };

 
  // Handle saving changes
  const handleSaveChanges =  async() => {
    setIsLoading(true);
    try {
      const response = await Axios({
        method : 'put',
        url : `${baseUrl}admin/profile`,
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Accept": "*/*",
        },
        
        data: {
          username: formData.username,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          pronouns: formData.pronouns,
          gender: formData.gender,
          homeAddress: formData.homeAddress,
          lat: 5,
          lng: -7
        }
      });
      message.success('details updated');
      setIsLoading(false);
    } catch (error) {
      message.error(error.message);
      setIsLoading(false);
    }
    console.log('Updated Profile Data:', formData);
    setIsEdit(false);
    // Implement the logic to save the data (e.g., API call)
  };

  return (
    <div className="" style={{padding: '20px 40px'}}>
        <div className="flex profile-holder flex-justify-between">
    <div className='flex flex-column ' >
      <Image
        
        className='driver-profile-images'
        src={`${imgBaseUrl}${profilePic}`}
      />
     <Upload
      name="profilePicture"
      showUploadList={false}
      beforeUpload={() => false} // Disable automatic upload
      onChange={handleProfilePictureChange}
      
      className="uploadimg"
    >
      <Button type="link">Change Profile Picture</Button>
    </Upload>
    </div>

    <div style={{position: 'relative'}}> 
            {/* Profile Form */}
    <section>
      <Form layout='inline' className='flex flex-center driver-details-form-header '>
        <Form.Item label="Name" layout='vertical'>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEdit}
            className='inp-new'
            style={{background: 'transparent'}}
          />
        </Form.Item>
        <Form.Item label="Email" layout='vertical'>
          <Input
            name="email"
            value={currentUser.email}
            style={{background: 'transparent'}}
            disabled
            className='inp-new'
          />
        </Form.Item>
        
      </Form>
    </section>
    <section>
      <Form layout='inline' className='flex flex-center driver-details-form-header'>
       
        <Form.Item label="Phone Number" layout='vertical'>
          <Input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            disabled={!isEdit}
            className='inp-new'
            style={{background: 'transparent'}}
          />
        </Form.Item>
        <Form.Item label="Admin Role" layout='vertical'>
          <Input
            name="adminRole"
            value={currentUser.name}
            onChange={handleInputChange}
            disabled
            className='inp-new'
            style={{background: 'transparent'}}
          />
        </Form.Item>
      </Form>
    </section>

    <section>
      <Form layout='inline' className='flex flex-center driver-details-form-header'>
        
        <Form.Item label="Gender" layout='vertical'>
          <Input
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            disabled={!isEdit}
            className='inp-new'
            style={{background: 'transparent'}}
          />
        </Form.Item>
        <Form.Item label="Home Address" layout='vertical'>
          <Input
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleInputChange}
            disabled={!isEdit}
            className='inp-new'
            style={{background: 'transparent'}}
          />
        </Form.Item>
      </Form>
    </section>
    <section>
      <Form layout='inline' className='flex flex-center driver-details-form-header'>
        <Form.Item label="UserName" layout='vertical'>
          <Input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={!isEdit}
            className='inp-new'
            style={{background: 'transparent'}}
          />
        </Form.Item>
        <Form.Item label="Pronouns" layout='vertical'>
          <Input
            name="pronouns"
            value={formData.pronouns}
            onChange={handleInputChange}
            disabled={!isEdit}
            className='inp-new'
            style={{background: 'transparent'}}
          />
        </Form.Item>
        
      </Form>
    </section>
    {/* <Link to='/dashboard/password/reset' className="password-reset-profile">Reset Password</Link> */}
    {/* Edit and Save Buttons */}
    <section className="profile-edit-btn flex ">
      {
        !isEdit ? (<Button type="primary" className={`${!isEdit ? 'profile-edit-btns': 'profile-edit-btns-disabled'}`}  disabled={isEdit} onClick={() => setIsEdit(true)} style={{background: '#4460ef'}}>
        Edit Profile
      </Button>) : (<Button style={{flex: 1}} onClick={() => setIsEdit(false  )}>Cancel</Button>) 
      }
      {isEdit && (
        <Button type="primary" className="profile-edit-btns" onClick={handleSaveChanges} loading = {isLoading}>
          Save Changes
        </Button>
      )}
    </section>

   
    </div>
    
  </div>
  
    </div>
  );
};

export default Profile;
