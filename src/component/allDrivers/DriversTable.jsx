import React, { useState, useContext } from "react";
import { Table, Avatar, Typography, Button, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const { Search } = Input;
import { MainContext } from "../../context/context";

const DriversTable = ({ driversData }) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const drivers = driversData?.data?.data || [];
  const navigate = useNavigate();
  const { baseUrl, token } = useContext(MainContext);

  const columns = [
    {
      title: "Profile Picture",
      dataIndex: "profilePic",
      key: "profilePic",
      render: (text) => <Avatar size={64} src={text} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Admin Consent",
      dataIndex: "adminConsent",
      key: "adminConsent",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering row click
              handleAction(record.rowId, "approve");
            }}
            style={{ marginRight: 8 }}
          >
            Approve
          </Button>
          <Button
            danger
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering row click
              handleAction(record.rowId, "decline");
            }}
          >
            Decline
          </Button>
        </div>
      ),
    },
  ];

  // Map the data to table-friendly format
  const dataSource = drivers.map((driver, index) => ({
    key: index,
    profilePic: driver.userDetailsData.profilePic,
    name: driver.userDetailsData.name,
    phoneNumber: driver.userDetailsData.phoneNumber,
    email: driver.userDetailsData.email,
    city: driver.row.city,
    adminConsent: driver.row.adminConsent,
    rowId: driver?.row?._id,
  }));

  // Filter the drivers based on the search term
  const filteredData = dataSource.filter(
    (driver) =>
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (admin) => {
    navigate(`/dashboard/alldrivers/${admin?.rowId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Drivers</Title>

      <Space style={{ marginBottom: "16px" }}>
        <Search
          placeholder="Search by name, email, or city"
          enterButton
          allowClear
          onSearch={(value) => setSearchTerm(value)}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        bordered
        pagination={{ pageSize: 5 }}
        onRow={(admin) => ({
          onClick: () => handleNavigate(admin),
        })}
        className="admin-table"
      />
    </div>
  );
};

export default DriversTable;
