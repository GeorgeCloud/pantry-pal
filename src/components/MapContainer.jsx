
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import { useGoogleContext } from '../context/GoogleContext';
import React, { useCallback } from 'react';
import mapStyles from '../assets/styles/map';
import FloatCard from './FloatCard';
import Markers from './Markers';

export default function Map() {
  const {
    setMap,
    activeMarkerId,
    organizations,
    directions,
    myLatLng,
    isDetailsPage,
    isLoaded,
  } = useGoogleContext();

  const onLoad = useCallback(
    function onLoad(map) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({
        lat: 37.773972,
        lng: -122.431297
      });
      setMap(map);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setMap]);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, [setMap]);

  return (
    <>
      {
        isLoaded && <GoogleMap
          mapContainerClassName="map"
          mapContainerStyle={{ height: '75%', width: '100%' }}
          zoom={12}
          options={{ 
            styles: mapStyles, 
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            panControl: true

          }}
          center={myLatLng}
          onLoad={onLoad}
          onUnmount={onUnmount}
          className="min-w-full"
        >
          { 
            organizations.length > 0 && !isDetailsPage &&
            <Markers organizations={organizations} myLatLng={myLatLng} />
          }

          {/* Show active card for selected organization */}
          {activeMarkerId !== null && organizations.length > 0 && <FloatCard />}

          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      }
    </>
  );
}
