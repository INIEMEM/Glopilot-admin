import React from "react";
import ProfileCard from "./ProfileCard";
import VehicleTable from "./Vehicledetails";
import VehicleMap from "./VehicleMap";
import VehicleFeatures from "./VehicleFeature";

const VehicleDetailsPage = ({ data }) => {
  // Safely access dataPro[0] and provide fallback values
  const dataPro = data?.data?.dataPro || [];
  console.log( data?.data?.dataPro )
  const {
    row = {},
    userDetailsData = {},
    driver = {},
    vehicle = {},
    vehicleCategory = {},  
    vehicleSubCategory = {}
  } = dataPro[0] || {}; // Use default empty object if dataPro[0] is undefined

  // Add a fallback UI in case there's no data
  if (dataPro.length === 0) {
    return <div>No vehicle data available.</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <ProfileCard userDetails={userDetailsData} driver={driver} />
      <h2>Car Details</h2>
      <VehicleTable vehicles={vehicle} />
      <h2>Current Vehicle Location</h2>
      <VehicleMap location={row.location || {}} />
      <h2>Vehicle Features</h2>
      <VehicleFeatures features={row.carFeatures || []} />
      <h2>Vehicle Category</h2>
      <p><strong>Category Name:</strong> {vehicleCategory.name || "Unknown"}</p>
      <p><strong>Subcategory Name:</strong> {vehicleSubCategory.name || "Unknown"}</p>
    </div>
  );
};

export default VehicleDetailsPage;
