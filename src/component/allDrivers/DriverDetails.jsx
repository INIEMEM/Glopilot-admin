import { useParams,useNavigate } from 'react-router-dom'
import { Card, Typography, Avatar, Row, Col, Descriptions, Button, message } from 'antd';
import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { MainContext } from '../../context/context';
const { Title, Text } = Typography;
const DriverDetails = () => {
  const { baseUrl, token } = useContext(MainContext);
  const {id} = useParams();
  const [drivers, setDrivers] = useState(null)
  const [driver, setDriver]  = useState(null);
  const[userDetails, setUserDetails] = useState(null);

  const handleAction = async (action) => {
    try {
      const response = await Axios(
        {
          method: 'put',
          url:`${baseUrl}vendor-driver/driver-${action}`, 
          data: {
            driverId: id
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        
        }
        
      );
      message.success(`Driver ${action}d successfully.`);
    } catch (error) {
      console.error(error);
      message.error("An error occurred. Please try again.");
    }
  };
  const fetchDriverDetails = async () =>
    {
      try {
        const response = await Axios({
          method: 'get',
          url: `${baseUrl}vendor-driver/driver?driverId=${id}`,
          
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

        });
        console.log(response.data);
        setDrivers(response.data?.data)

      } catch (error) {
        console.error('driver details >>', error)
      }
    }

    useEffect(()=>{
      fetchDriverDetails();
    }, [])

    useEffect(()=>{
      setDriver(drivers?.driver)
      setUserDetails(drivers?.userDetailsData);
    }, [drivers])
    
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{fontSize: 35}}>{userDetails?.name}'s Details</h1>
      <Row gutter={[16, 16]}>
        {/* Driver Profile Section */}
        <Col span={8}>
          <Card style={{ textAlign: "center" }}>
            <Avatar
              size={128}
              src={userDetails?.profilePic}
              alt={userDetails?.name}
            />
            <Title level={4}>{userDetails?.name}</Title>
            <Text strong>{userDetails?.email}</Text>
            <br />
            <Text>{userDetails?.phoneNumber}</Text>
          </Card>
        </Col>

        {/* Driver Details Section */}
        <Col span={16}>
          <Card title="Driver Details">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="City">{driver?.city}</Descriptions.Item>
              <Descriptions.Item label="Drive Type">{driver?.driveType}</Descriptions.Item>
              <Descriptions.Item label="Why Drive">{driver?.whyDrive}</Descriptions.Item>
              <Descriptions.Item label="Drive Hours">{driver?.driveHours}</Descriptions.Item>
              <Descriptions.Item label="Drive Day">{driver?.driveDay}</Descriptions.Item>
              <Descriptions.Item label="Drive Period">{driver?.drivePeriod}</Descriptions.Item>
              <Descriptions.Item label="Other Businesses">{driver?.otherBusinesses}</Descriptions.Item>
              <Descriptions.Item label="Admin Consent">{driver?.adminConsent}</Descriptions.Item>
              <Descriptions.Item label="Wallet Balance">
                ${userDetails?.walletBalance.toFixed(2)}
              </Descriptions.Item>
              <Descriptions.Item label="Home Address">
                {userDetails?.homeAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Work Address">
                {userDetails?.workAddress}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Documents Section */}
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card cover={<img alt="Identity Front" src={driver?.identityFront} />}>
            <Card.Meta title="Identity Front" />
          </Card>
        </Col>
        <Col span={8}>
          <Card cover={<img alt="Identity Back" src={driver?.identityBack} />}>
            <Card.Meta title="Identity Back" />
          </Card>
        </Col>
        <Col span={8}>
          <Card cover={<img alt="Driver License" src={driver?.driverLicense} />}>
            <Card.Meta title="Driver License" />
          </Card>
        </Col>
      </Row>

      <div className='flex' style={{ marginTop: 15}}>
          <Button
            type="primary"
            onClick={() => handleAction( "approve")}
            style={{ marginRight: 8, flex: 1 }}
          >
            Approve
          </Button>
          <Button
            danger
            onClick={() => handleAction( "decline")}
            style={{  flex: 1 }}
            type="primary"
          >
            Decline
          </Button>
        </div>
    </div>
  )
}

export default DriverDetails