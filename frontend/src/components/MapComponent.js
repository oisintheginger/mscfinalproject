//Commented out sections to be used once GoogleAPI is set up.
//Map will render and a single marker will be shown.
//To be sorted later....

// import { useMemo } from "react";
// import {GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api';
import './map.css'

function MapComponent(){
    // const{isLoaded} = useLoadScript({
    //     googleMapsApiKey: "INSERT API KEY HERE"
    // })
    //     if(!isLoaded) return (<div>Loading... </div>)

    return(
        <>
        <Map/>
        </>
    )
}

function Map(){
    // const center = useMemo(()=>({lat:39.29, lng:-76.61}),[]);
    return (

        <div>MAP IS RENDERED</div>
//         <GoogleMap zoom={13} center={center} mapContainerClassName="map-container">
//             <MarkerF position={{lat:39.308994,lng:-76.62804}}

// />
//         </GoogleMap>
    )
}

export default MapComponent;

