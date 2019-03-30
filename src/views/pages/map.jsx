import React from 'react';
import Helmet from 'react-helmet';
import MapView, { Sidebar } from '@components/Map';

const MapPage = () => (
  <>
    <Helmet title="Map" />

    <Sidebar />

    <div className="l-content--fullscreen">
      <MapView
        options={{
          map: {
            minZoom: 2,
            maxZoom: 25,
            zoomControl: false,
          },
        }}
      />

      <div className="m-loader" id="loader">
        loading
      </div>

      <div className="m-legend" id="legendView" />
    </div>
  </>
);

export default MapPage;
