import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { useContext } from "react";
import { MainContext } from "../../context/context";

const VehicleMap = ({ location }) => {
  const { coordinates } = location;
  const {googleApiKey} = useContext(MainContext);
  return (
    <LoadScript googleMapsApiKey={googleApiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={{ lat: coordinates[1], lng: coordinates[0] }}
        zoom={10}
      >
        <Marker position={{ lat: coordinates[1], lng: coordinates[0] }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default VehicleMap