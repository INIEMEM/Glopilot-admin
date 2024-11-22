import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, Input, InputNumber, Table, Space, Popconfirm } from "antd";
import Axios from "axios";
import { MainContext } from "../../context/context";

const RideTypes = () => {
  const { baseUrl, token } = useContext(MainContext);
  const [rideTypes, setRideTypes] = useState([]);
  const [filteredRideTypes, setFilteredRideTypes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRideType, setSelectedRideType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  // Fetch ride types
  const fetchRideTypes = async () => {
    try {
      const response = await Axios({
        method: "get",
        url: `${baseUrl}vendor-driver/trip-types`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data?.data?.rideTpe || [];
      setRideTypes(data);
      setFilteredRideTypes(data); // Initialize filtered list
    } catch (error) {
      console.error("Error fetching ride types:", error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = rideTypes.filter(
      (ride) =>
        ride.name.toLowerCase().includes(term) ||
        ride.mode.toLowerCase().includes(term) ||
        String(ride.rate).includes(term)
    );
    setFilteredRideTypes(filtered);
  };

  // Handle create or update ride type
  const handleSaveRideType = async (values) => {
    try {
      if (isEditMode && selectedRideType) {
        // Update request
        await Axios({
          method: "put",
          url: `${baseUrl}vendor-driver/trip-type`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            tripTypeId: selectedRideType._id,
            rate: values.rate,
          },
        });
      } else {
        // Create request
        await Axios({
          method: "post",
          url: `${baseUrl}vendor-driver/trip-type`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: values,
        });
      }
      fetchRideTypes();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error(isEditMode ? "Error updating ride type:" : "Error creating ride type:", error);
    }
  };

  // Handle delete ride type
  const handleDeleteRideType = async (tripTypeId) => {
    try {
      await Axios({
        method: "delete",
        url: `${baseUrl}vendor-driver/trip-type`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { tripTypeId },
      });
      fetchRideTypes();
    } catch (error) {
      console.error("Error deleting ride type:", error);
    }
  };

  useEffect(() => {
    fetchRideTypes();
  }, []);

  const openModal = (rideType = null) => {
    setSelectedRideType(rideType);
    setIsEditMode(!!rideType);
    setIsModalVisible(true);
    if (rideType) {
      form.setFieldsValue({
        name: rideType.name,
        mode: rideType.mode,
        rate: rideType.rate,
      });
    } else {
      form.resetFields();
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this ride type?"
            onConfirm={() => handleDeleteRideType(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{fontSize: 35}}>Ride Types</h1>
      <div style={{ marginBottom: 20 }}>
        <Input
          placeholder="Search by name, mode, or rate"
          value={searchTerm}
          onChange={handleSearch}
          style={{ marginBottom: 20 }}
        />
        <Button type="primary" onClick={() => openModal()}>
          Create Ride Type
        </Button>
      </div>

      <Table
        style={{ background: "white" }}
        className="admin-table"
        dataSource={filteredRideTypes.map((ride) => ({ ...ride, key: ride._id }))}
        columns={columns}
        bordered
      />

      <Modal
        title={isEditMode ? "Edit Ride Type" : "Create Ride Type"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveRideType}>
          {!isEditMode && (
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input placeholder="e.g., One Way" />
            </Form.Item>
          )}

          {!isEditMode && (
            <Form.Item
              name="mode"
              label="Mode"
              rules={[{ required: true, message: "Please enter the mode" }]}
            >
              <Input placeholder="e.g., Package" />
            </Form.Item>
          )}

          <Form.Item
            name="rate"
            label="Rate"
            rules={[{ required: true, message: "Please enter the rate" }]}
          >
            <InputNumber placeholder="e.g., 1.5" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isEditMode ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RideTypes;
