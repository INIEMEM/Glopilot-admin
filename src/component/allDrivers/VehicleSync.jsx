import React, { useEffect, useState, useContext } from "react";
import { List, Card, message, Modal, Typography, Row, Col } from "antd";
import Axios from "axios";
import { MainContext } from "../../context/context";

const { Title, Text } = Typography;

const VehicleSync = () => {
  const { baseUrl, token } = useContext(MainContext);
  const [syncData, setSyncData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = (item) => {
    setSelectedData(item); // Set selected data first
    setIsModalOpen(true); // Open modal
  };

  // Fetch Sync Data on Component Load
  useEffect(() => {
    const fetchSyncData = async () => {
      try {
        const response = await Axios({
          method: "get",
          url: `${baseUrl}vendor-driver/vehicle-sync`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setSyncData(response.data.data.sync);
        console.log("The sync data:", response.data?.data?.sync);
      } catch (error) {
        message.error("Failed to fetch vehicle sync data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSyncData();
  }, [baseUrl, token]);

  // Fetch Vehicle Data When `selectedData` Changes
  useEffect(() => {
    if (selectedData?.subCategory?._id) {
      const fetchData = async () => {
        try {
          const response = await Axios({
            method: "get",
            url: `${baseUrl}vendor-driver/vehicle-sync-by-sub-category`,
            params: {
              vehicleSubCategoryId: selectedData.subCategory._id, // Pass via query params
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setVehicleData(response.data?.data);
          console.log("Fetched data:", response.data);
        } catch (error) {
          message.error("Failed to fetch vehicle data.");
          console.error("Fetch error:", error);
        }
      };

      fetchData();
    }
  }, [selectedData, baseUrl, token]);

  if (loading) return <p>Loading...</p>;

  // Ensure vehicleData is not null before destructuring
  const { checkData = {}, checkData1 = {}, checkData2 = {} } = vehicleData || {};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vehicle Sync Data</h2>
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={syncData}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item?.subCategory?.name}
              hoverable
              onClick={() => showModal(item)}
            >
              <p>
                <strong>Type:</strong> {item?.type?.name}
              </p>
              <p>
                <strong>Uses:</strong> {item.type.uses}
              </p>
              <p>
                <strong>Category:</strong> {item.category.name}
              </p>
              <p>
                <strong>Country:</strong> {item.subCategory.country}
              </p>
              <p>
                <strong>Hourly Price:</strong> ${item.subCategory.hourlyPrice}
              </p>
              <p>
                <strong>Distance Price:</strong> $
                {item.subCategory.distancePrice}/km
              </p>
              <p>
                <strong>Daily Price:</strong> ${item.subCategory.dailyPrice}
              </p>
              <p>
                <strong>Min Load Weight:</strong>{" "}
                {item.subCategory.minLoadWeight} kg
              </p>
              <p>
                <strong>Max Load Weight:</strong>{" "}
                {item.subCategory.maxLoadWeight} kg
              </p>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        title={
          <div>
            {selectedData?.subCategory?.name} Modal
          </div>
        }
        
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        {/* Modal Content */}
        <div style={{ padding: "20px" }}>
          
          <Row gutter={[16, 16]}>
            {/* CheckData2 (Vehicle Details) */}
            <Col span={24}>
              <Card title="Vehicle Info">
                <p><Text strong>Name:</Text> {checkData2.name || 'N/A'}</p>
                <p><Text strong>Country:</Text> {checkData2.country || 'N/A'}</p>
                <p><Text strong>Hourly Price:</Text> ${checkData2.hourlyPrice || 'N/A'}</p>
                <p><Text strong>Distance Price:</Text> ${checkData2.distancePrice || 'N/A'}/km</p>
                <p><Text strong>Daily Price:</Text> ${checkData2.dailyPrice || 'N/A'}</p>
                <p><Text strong>Service Charge:</Text> ${checkData2.serviceCharge || 'N/A'}</p>
                <p><Text strong>Load Weight:</Text> {checkData2.minLoadWeight || 'N/A'} - {checkData2.maxLoadWeight || 'N/A'} kg</p>
              </Card>
            </Col>

            {/* CheckData1 (Car and Owner Details) */}
            <Col span={24}>
              <Card title="Car Details">
                <p><Text strong>Make:</Text> {checkData1.make || 'N/A'}</p>
                <p><Text strong>Model:</Text> {checkData1.model || 'N/A'}</p>
                <p><Text strong>Year:</Text> {checkData1.year || 'N/A'}</p>
                <p><Text strong>Color:</Text> {checkData1.color || 'N/A'}</p>
                <p><Text strong>Seats:</Text> {checkData1.seats || 'N/A'}</p>
                <p><Text strong>Transmission:</Text> {checkData1.transmission || 'N/A'}</p>
                <p><Text strong>Wheelchair Ramp:</Text> {checkData1.wheelChairRamp ? "Yes" : "No"}</p>
                <p><Text strong>Available:</Text> {checkData1.isAvailable ? "Yes" : "No"}</p>
              </Card>
            </Col>

            {/* CheckData (Status Info) */}
            <Col span={24}>
              <Card title="Status Info">
                <p><Text strong>Status:</Text> {checkData.status || 'N/A'}</p>
                <p><Text strong>Vehicle ID:</Text> {checkData.vehicleId || 'N/A'}</p>
                <p><Text strong>Type ID:</Text> {checkData.vehicleTypeId || 'N/A'}</p>
                <p><Text strong>Category ID:</Text> {checkData.vehicleCategoryId || 'N/A'}</p>
                <p><Text strong>Subcategory ID:</Text> {checkData.vehicleSubCategoryId || 'N/A'}</p>
              </Card>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default VehicleSync;
