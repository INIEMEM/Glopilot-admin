import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const VehicleFeatures = ({ features }) => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <span>
        Unlimited Mileage:{" "}
        {features.unlimitedMileage ? <CheckOutlined /> : <CloseOutlined />}
      </span>
      <span>
        Airport Pickup:{" "}
        {features.airportPickup ? <CheckOutlined /> : <CloseOutlined />}
      </span>
    </div>
  );
};
export default VehicleFeatures