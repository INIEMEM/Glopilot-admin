import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../../context/context';
import { Image, Form , Input, Button, message} from 'antd';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './admin.css';

const AdminDetails = () => {
  const {admin} =  useParams();
  const {baseUrl, token, imgBaseUrl} = useContext(MainContext);
  const [adminDetails, setAdminDetails] = useState([])
  const navigate = useNavigate(); 

  const getAdminDetails = async () =>
    {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}admin/admin?userId=${admin}`,
          headers:
          {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Accept": "*/*",
          },

        })

        console.log(response.data);
        setAdminDetails(response?.data?.admin);
    }

  useEffect(()=>{
    getAdminDetails();
  }, []);

   // Function to handle updating status
   const updateStatus = (adminId, newStatus) => {
    try {


      // Make the API call to update the driver status
      Axios({
        method: 'put', // Assuming it's a PUT request to update the status
        url: `${baseUrl}admin/${newStatus}`,
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Accept": "*/*",
        },
        data: {
          userId: adminId,
        },
      })
      .then((res) => {
        console.log(`Driver ${adminId} status updated to ${newStatus}`);
        // Optionally, refetch the driver list after updating status
        
        message.success(`Admin  status updated to ${newStatus}`);
      })
      .catch((err) => {
        console.error('Failed to update status', err);
        message.error(err.message);
      });
    } catch (error) {
      
    }
  };
  if(adminDetails.length == 0)
    {
      return(<div>Loading...</div>)
    }
  return (
    <div className="admin-details-holder" >
      <div className='flex flex-justify-between admin-details-container' style={{padding: '20px 40px'}}>
      <div className='flex flex-center driver-profile-image'>
          <Image
            width={300}
            height={400}
            className='driver-profile-image'
            src={`${imgBaseUrl}${adminDetails?.profilePic}`} />
      </div>
     <div>
     <header>
        
        <Form layout='inline' className='flex flex-center driver-details-form-header' >
          <Form.Item label="Admin Name" layout='vertical'>
            <Input value={adminDetails?.name} disabled className='inp-new' />
          </Form.Item>
          <Form.Item label="Admin Email" layout='vertical' >
            <Input value={adminDetails?.email}  disabled className='inp-new' />
          </Form.Item>
          
        </Form>
        </header>
        <header>
        
        <Form layout='inline' className='flex flex-center driver-details-form-header' >
          
          <Form.Item label="Admin Phone Number" layout='vertical'>
            <Input value={adminDetails?.phoneNumber} disabled  className='inp-new'/>
          </Form.Item>
          <Form.Item label="Admin Home address" layout='vertical'>
            <Input value={adminDetails?.homeAddress} disabled  className='inp-new'/>
          </Form.Item>
        </Form>
        </header>
        <section className="driver-details-info">
        
        <Form layout='inline' className='flex  flex-center driver-details-form-header' >
          
          
          <Form.Item label="Admin gender" layout='vertical'>
            <Input value={adminDetails?.gender} className='inp-new' disabled />
          </Form.Item>
          <Form.Item label="Admin UserName" layout='vertical'>
            <Input value={adminDetails?.username} className='inp-new' disabled />
          </Form.Item>
        </Form>
        </section>
        <section className="driver-details-info">
        
        <Form layout='inline' className='flex  flex-center driver-details-form-header' >
          
          
          <Form.Item label="Wallet Address" layout='vertical'>
            <Input value={adminDetails?.walletBalance} className='inp-new'  disabled />
          </Form.Item>
          <Form.Item label="Admins Roles" layout='vertical'>
            <Input value={adminDetails?.role} className='inp-new'  disabled />
          </Form.Item>
          
          
        </Form>
        </section>
        <section className="driver-details-info">
        
        <Form layout='inline' className='flex  flex-center driver-details-form-header' >
          
          
        <Form.Item label="Admin Action" layout='vertical'>
            <Input value={adminDetails?.actions} className='inp-new'  disabled />
          </Form.Item>
         
        </Form>
        </section>
        <div className='btn-admins flex'>
            <Button onClick={() => updateStatus(adminDetails?._id, 'approve')} type="primary" style={{ marginRight: 8 , flex: '1', height: '45px'}}
              disabled = {adminDetails?.adminConsent === 'approved'}
            
            >Approve</Button>
           
            <Button onClick={() => updateStatus(adminDetails?._id, 'suspend')} style={{flex: '1', height: '45px'}} type="default" className='orange-btn'  disabled = {adminDetails?.adminConsent === "suspended"}>Suspend</Button>
          </div>
     </div>
    </div>
    </div>
  )
}

export default AdminDetails