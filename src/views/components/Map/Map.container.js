import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  load as loadLayers,
  setActives,
  getGrouped,
  getActives,
  makeDefaultActives,
} from '@modules/layers';
import { load as loadLayerGroups, openBatch } from '@modules/layer_groups';
import { makeLayer as makeModelLayer } from '@modules/predictive_models';

import MapView from './Map.component';

const makeMapStateToProps = () => {
  const groupedLayers = getGrouped();
  const defaultActives = makeDefaultActives();
  const getModelLayer = makeModelLayer();

  const mapStateToProps = state => ({
    site: state.site,
    layers: state.layers,
    drawing: state.map.drawing,
    geojson: state.map.geojson,
    basemap: state.map.basemap,
    layer_groups: state.layer_groups,
    activeLayers: getActives(state),
    model_layer: getModelLayer(state),
    defaultActiveGroups: defaultActives(state),
    grouped: groupedLayers(state),
  });

  return mapStateToProps;
};

const mapDispatchToProps = {
  loadLayers,
  loadLayerGroups,
  setActives,
  openBatch,
};

export default compose(
  withRouter,
  connect(
    makeMapStateToProps,
    mapDispatchToProps,
  ),
)(MapView);
