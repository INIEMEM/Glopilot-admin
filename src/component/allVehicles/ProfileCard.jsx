import { Card, Avatar } from "antd";

const ProfileCard = ({ userDetails, driver }) => {
  return (
    <Card title="Owner & Driver Information">
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Avatar src={userDetails.profilePic} size={80} />
        <div>
          <h3>{userDetails.name}</h3>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phoneNumber}</p>
        </div>
      </div>
      <hr />
      <h4>Driver Details</h4>
      <p>City: {driver.city}</p>
      <p>Drive Type: {driver.driveType}</p>
      <p>Admin Consent: {driver.adminConsent}</p>
    </Card>
  );
};

export default ProfileCard