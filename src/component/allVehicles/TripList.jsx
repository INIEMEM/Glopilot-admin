import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import Axios from 'axios';
import { MainContext } from '../../context/context';

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { baseUrl, token } = useContext(MainContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchTrips = async () => {
    try {
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}vendor-driver/trips`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data.data; // Adjust based on actual response structure
    } catch (error) {
      console.error('Error fetching trips:', error);
      return [];
    }
  };

  const fetchTripDetails = async (rideRequestId) => {
    try {
      const response = await Axios({
        method: 'get',
        url: `${baseUrl}vendor-driver/trip?rideRequestId=${rideRequestId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data; // Adjust based on actual response structure
    } catch (error) {
      console.error('Error fetching trip details:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadTrips = async () => {
      const tripData = await fetchTrips();
      setTrips(tripData);
      setFilteredTrips(tripData); // Initialize filteredTrips with all trips
    };
    loadTrips();
  }, []);

  const handleViewDetails = async (rideRequestId) => {
    const tripDetails = await fetchTripDetails(rideRequestId);
    setSelectedTrip(tripDetails);
    setIsModalVisible(true);
  };

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = trips.filter((trip) => {
      const email = trip.user?.email?.toLowerCase() || "";
      const tripType = trip.trip?.trip?.toLowerCase() || "";
      const vehicleType = trip.vehicle?.Type?.toLowerCase() || "";

      return (
        email.includes(term) ||
        tripType.includes(term) ||
        vehicleType.includes(term)
      );
    });

    setFilteredTrips(filtered);
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: 'Trip Type',
      dataIndex: ['trip', 'trip'],
      key: 'tripType',
    },
    {
      title: 'Vehicle Type',
      dataIndex: ['vehicle', 'Type'],
      key: 'vehicleType',
    },
    {
      title: 'Price',
      dataIndex: ['charge', 'price'],
      key: 'price',
      render: (price) => `₦${price.toFixed(2)}`,
    },
    {
      title: 'Pickup Time',
      dataIndex: 'pickupTime',
      key: 'pickupTime',
      render: (time) => new Date(time).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => handleViewDetails(record.id.request)}>View Details</Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Trips</h1>
      <Input
        placeholder="Search by email, trip type, or vehicle type"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: 20, width: 300 }}
      />
      <Table
        style={{ background: 'white' }}
        className="admin-table"
        columns={columns}
        dataSource={filteredTrips}
        rowKey={(record) => record.id.request}
      />
      <Modal
        title="Trip Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedTrip && (
          <div>
            <p><strong>Email:</strong> {selectedTrip.user.email}</p>
            <p><strong>Ride Pin:</strong> {selectedTrip.user.ridePin}</p>
            <p><strong>Vehicle:</strong> {selectedTrip.vehicle.Type}</p>
            <p><strong>Pickup:</strong> {selectedTrip.pick.placeAddress}</p>
            <p><strong>Drop:</strong> {selectedTrip.drop.placeAddress}</p>
            <p><strong>Price:</strong> ₦{selectedTrip.charge.price.toFixed(2)}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TripList;
