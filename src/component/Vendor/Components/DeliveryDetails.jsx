import React, {useState, useContext, useEffect} from 'react'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MainContext } from '../../../context/context';
const DeliveryDetails = ({delivery}) => {
  const {googleApiKey} = useContext(MainContext)
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);
  return (
    <div>
        <h3>Delivery Details</h3>
        <p>Tracking ID: {delivery?.trackingId}</p>
        <p>Delivery Price: ${delivery?.deliveryPrice}</p>
        
        {/* <APIProvider apiKey={googleApiKey}>
          <div style={{height: 400}}>
            <Map zoom={9} center={position}/>
          </div>
        </APIProvider> */}
    </div>
  )
}

export default DeliveryDetails