import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 1.4029897287723678,
  lng: 103.91765866702444
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
    lat: 3.4029897287723678,
    lng: 100.91765866702444
  }]

  const [map, setMap] = React.useState(null)


  const onLoad = React.useCallback(function callback(map) {
    console.log(map);
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.zoom = 14;
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const area = areas.find(a => a.area === location);

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onUnmount={onUnmount}

      >
        { /* Child components, such as markers, info windows, etc. */ }
        {console.log(area)}
        <Marker position={{lat: parseInt(area.lat), lng: parseInt(area.lng)}}/>
      </GoogleMap>
  ) : <></>
}

//export default React.memo(MyComponent)