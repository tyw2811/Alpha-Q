import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Typography } from '@mui/material';

export default function Home(){
  console.log(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,

  });

  if (!isLoaded) return <div><Typography>PEEPEE</Typography></div>
  return <div><Typography>Succ</Typography></div>
}

