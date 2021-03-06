import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

export default function MyComponent({location}) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })
  const areas = [{
    area: "Punggol",
    lat: 1.4029897287723678,
    lng: 103.91765866702444
  }, {
    area: "Hougang",
    lat: 1.3715304982645449,
    lng: 103.89272759746416
  }, {
    area: "Bishan",
    lat: 1.3506460537972835,
    lng: 103.84786212177235
  }, {
    area: "Redhill",
    lat: 1.289291598245397,
    lng: 103.81689648378763
  }]

  const [map, setMap] = React.useState(null)

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const area = areas.find(a => a.area === location);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: area.lat, lng: area.lng}}
        zoom={15}
        onUnmount={onUnmount}

      >
        <Marker position={{lat: area.lat, lng: area.lng}}/>
      </GoogleMap>
  ) : <></>
}