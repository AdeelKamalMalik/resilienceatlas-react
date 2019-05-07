import React, { useCallback, useEffect } from 'react';
import qs from 'qs';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';
import { Map as Maps, MapControls, ZoomControl } from 'vizzuality-components';

import { setRouterParam } from '@utilities';
import Toolbar from './Toolbar';

const basemaps = {
  defaultmap: {
    url:
      'https://api.mapbox.com/styles/v1/cigrp/cixkh6jb000582smx8pfdeu23/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2lncnAiLCJhIjoiYTQ5YzVmYTk4YzM0ZWM4OTU1ZjQxMWI5ZDNiNTQ5M2IifQ.SBgo9jJftBDx4c5gX4wm3g',
    labelsUrl:
      'https://api.mapbox.com/styles/v1/cigrp/ciztvip04005h2sup0z42fqip/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2lncnAiLCJhIjoiYTQ5YzVmYTk4YzM0ZWM4OTU1ZjQxMWI5ZDNiNTQ5M2IifQ.SBgo9jJftBDx4c5gX4wm3g',
  },
  satellite: {
    url:
      'https://api.mapbox.com/styles/v1/cigrp/cizsz6pv700422ro73xdhzi1g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2lncnAiLCJhIjoiYTQ5YzVmYTk4YzM0ZWM4OTU1ZjQxMWI5ZDNiNTQ5M2IifQ.SBgo9jJftBDx4c5gX4wm3g',
    labelsUrl:
      'https://api.mapbox.com/styles/v1/cigrp/cixteb1kq00112snx1acem71e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2lncnAiLCJhIjoiYTQ5YzVmYTk4YzM0ZWM4OTU1ZjQxMWI5ZDNiNTQ5M2IifQ.SBgo9jJftBDx4c5gX4wm3g',
  },
  topographic: {
    url:
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
    labelsUrl:
      'https://api.mapbox.com/styles/v1/cigrp/ciztvip04005h2sup0z42fqip/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2lncnAiLCJhIjoiYTQ5YzVmYTk4YzM0ZWM4OTU1ZjQxMWI5ZDNiNTQ5M2IifQ.SBgo9jJftBDx4c5gX4wm3g',
  },
  dark: {
    url:
      'https://api.mapbox.com/styles/v1/cigrp/cixtef50400162rla1jtwtoyi/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2lncnAiLCJhIjoiYTQ5YzVmYTk4YzM0ZWM4OTU1ZjQxMWI5ZDNiNTQ5M2IifQ.SBgo9jJftBDx4c5gX4wm3g',
    labelsUrl:
      'https://api.mapbox.com/styles/v1/cigrp/cixtein9t001j2rnr4b9uzugr/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2lncnAiLCJhIjoiYTQ5YzVmYTk4YzM0ZWM4OTU1ZjQxMWI5ZDNiNTQ5M2IifQ.SBgo9jJftBDx4c5gX4wm3g',
  },
};

const MapView = ({
  // actions
  loadLayers,
  loadLayerGroups,
  // data
  layers: { loaded: layersLoaded },
  layer_groups: { loaded: layerGroupsLoaded },
  activeLayers,
  defaultActiveGroups,
  location,
  site,
  options,
  basemap = 'defaultmap',
  embed,
  openBatch,
  journeyMap,
}) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
    parseArrays: true,
  });

  useEffect(() => {
    loadLayers();
    loadLayerGroups();
  }, []);

  useEffect(() => {
    if (layersLoaded && layerGroupsLoaded && defaultActiveGroups.length) {
      openBatch(defaultActiveGroups);
    }
  }, [layersLoaded, layerGroupsLoaded]);

  useEffect(() => {
    const hash = activeLayers.map(({ id, opacity, chartLimit }, order) => ({
      id,
      opacity,
      order,
      chartLimit,
    }));

    if (layersLoaded) {
      setRouterParam('layers', JSON.stringify(hash));
    }
  }, [activeLayers]);

  const getCenter = useCallback(() => {
    if (site.lat) {
      return { lat: site.lat, lng: site.lng };
    }
    return { lat: 3.86, lng: 47.28 };
  }, [site.lat]);

  return (
    <Maps
      customClass="m-map"
      basemap={{
        url: basemaps[basemap].url,
      }}
      mapOptions={{
        ...options.map,
        zoom: query.zoom || 5,
        center: query.center ? qs.parse(query.center) : getCenter(),
        scrollWheelZoom: !embed,
      }}
      events={{
        click: () => {},
        zoomend: (e, map) => {
          setRouterParam('zoom', map.getZoom());
        },
        dragend: (e, map) =>
          setRouterParam('center', qs.stringify(map.getCenter())),
      }}
    >
      {map => (
        <>
          <LayerManager map={map} plugin={PluginLeaflet}>
            {activeLayers.map(l => (
              <Layer
                key={l.id}
                {...l}
                decodeParams={
                  l.decodeParams
                    ? { ...l.decodeParams, chartLimit: l.chartLimit || 100 }
                    : null
                }
              />
            ))}
          </LayerManager>

          <MapControls customClass="c-map-controls">
            <Toolbar />
            <ZoomControl map={map} />
          </MapControls>
        </>
      )}
    </Maps>
  );
};

export default MapView;
