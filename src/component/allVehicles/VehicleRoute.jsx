import React, { useEffect, useState, useContext } from "react";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import { MainContext } from "../../context/context";
import Axios from "axios";
import VehicleRouteTable from "./VehicleRouteData";

const VehicleRoute = () => {
  const { baseUrl, token } = useContext(MainContext);
  const [routes, setRoutes] = useState({});
  const [filteredRoutes, setFilteredRoutes] = useState({});
  const [rawRoutes, setRawRoutes] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchRoutes = async () => {
    try {
      const response = await Axios({
        method: "get",
        url: `${baseUrl}vendor-driver/vehicle-routes`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setRawRoutes(response.data);
    } catch (error) {
      console.error("fetch error >>>", error);
    }
  };

  const handleCreateRoute = async (values) => {
    try {
      const response = await Axios({
        method: "post",
        url: `${baseUrl}vendor-driver/vehicle-route`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: values,
      });

      console.log("Route created:", response.data);
      fetchRoutes(); // Refresh the routes list
      setIsModalVisible(false);
      form.resetFields(); // Reset the form after submission
    } catch (error) {
      console.error("Error creating route:", error);
    }
  };

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = Object.entries(rawRoutes).reduce((acc, [key, routeList]) => {
      const filteredList = routeList.filter(
        (route) =>
          route.fromBusStopAddress.toLowerCase().includes(searchValue) ||
          route.toBusStopAddress.toLowerCase().includes(searchValue) ||
          route.country.toLowerCase().includes(searchValue)
      );
      if (filteredList.length) {
        acc[key] = filteredList;
      }
      return acc;
    }, {});

    setFilteredRoutes(filtered);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {
    setRoutes(rawRoutes);
    setFilteredRoutes(rawRoutes);
  }, [rawRoutes]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Vehicle Routes</h2>

      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Input.Search
          placeholder="Search routes by address or country"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)} // Live search
          style={{ maxWidth: 400 }}
        />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Create Route
        </Button>
      </div>

      {filteredRoutes && <VehicleRouteTable routeData={filteredRoutes} />}

      <Modal
        title="Create New Route"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateRoute}
          initialValues={{
            country: "Nigeria",
          }}
        >
          <Form.Item
            name="fromBusStopCordinate"
            label="From Bus Stop Coordinate"
            rules={[{ required: true, message: "Enter valid coordinates" }]}
          >
            <Input placeholder="e.g., [3, 13]" />
          </Form.Item>

          <Form.Item
            name="toBusStopCordinate"
            label="To Bus Stop Coordinate"
            rules={[{ required: true, message: "Enter valid coordinates" }]}
          >
            <Input placeholder="e.g., [8, 19]" />
          </Form.Item>

          <Form.Item
            name="fromBusStopAddress"
            label="From Bus Stop Address"
            rules={[{ required: true, message: "Enter the address" }]}
          >
            <Input placeholder="e.g., Aka Road, Uyo" />
          </Form.Item>

          <Form.Item
            name="toBusStopAddress"
            label="To Bus Stop Address"
            rules={[{ required: true, message: "Enter the address" }]}
          >
            <Input placeholder="e.g., Aba, Abia State" />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Enter the country" }]}
          >
            <Input placeholder="e.g., Nigeria" />
          </Form.Item>

          <Form.Item
            name="distancePrice"
            label="Distance Price (₦)"
            rules={[{ required: true, message: "Enter the price" }]}
          >
            <InputNumber placeholder="e.g., 5000" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="fixedPrice"
            label="Fixed Price (₦)"
            rules={[{ required: true, message: "Enter the price" }]}
          >
            <InputNumber placeholder="e.g., 3500" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Route
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VehicleRoute;
