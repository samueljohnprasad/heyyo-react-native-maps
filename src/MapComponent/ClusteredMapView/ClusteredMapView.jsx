/* eslint-disable function-paren-newline */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, {
  forwardRef,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, LayoutAnimation, Platform } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import SuperCluster from 'supercluster';

import ClusterMarker from './ClusteredMarker';
import {
  calculateBBox,
  generateSpiral,
  isMarker,
  markerToGeoJSONFeature,
  returnMapZoom,
} from './helpers';

const ClusteredMapView = forwardRef(
  (
    {
      radius,
      maxZoom,
      minZoom,
      minPoints,
      extent,
      nodeSize,
      children,
      onClusterPress,
      onRegionChangeComplete,
      onMarkersChange,
      preserveClusterPressBehavior,
      clusteringEnabled,
      clusterColor,
      clusterTextColor,
      clusterFontFamily,
      spiderLineColor,
      layoutAnimationConf,
      animationEnabled,
      renderCluster,
      tracksViewChanges,
      spiralEnabled,
      superClusterRef,
      ...restProps
    },
    ref,
  ) => {
    const [markers, updateMarkers] = useState([]);
    const [spiderMarkers, updateSpiderMarker] = useState([]);
    const [otherChildren, updateChildren] = useState([]);
    const [superCluster, setSuperCluster] = useState(null);
    const [currentRegion, updateRegion] = useState(
      restProps.region || restProps.initialRegion,
    );

    const [isSpiderfier, updateSpiderfier] = useState(false);
    const [clusterChildren, updateClusterChildren] = useState(null);
    const mapRef = useRef();

    const propsChildren = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    useEffect(() => {
      const rawData = [];
      const newOtherChildren = [];

      if (!clusteringEnabled) {
        updateSpiderMarker([]);
        updateMarkers([]);
        updateChildren(propsChildren);
        setSuperCluster(null);
        return;
      }

      propsChildren.forEach((child, index) => {
        if (isMarker(child)) {
          rawData.push(markerToGeoJSONFeature(child, index));
        } else {
          newOtherChildren.push(child);
        }
      });

      const superCluster = new SuperCluster({
        radius,
        maxZoom,
        minZoom,
        minPoints,
        extent,
        nodeSize,
      });

      superCluster.load(rawData);

      const bBox = calculateBBox(currentRegion);
      const zoom = returnMapZoom(currentRegion, bBox, minZoom);
      const newMarkers = superCluster.getClusters(bBox, zoom);

      updateMarkers(newMarkers);
      updateChildren(newOtherChildren);
      setSuperCluster(superCluster);

      superClusterRef.current = superCluster;
    }, [propsChildren, clusteringEnabled]);

    useEffect(() => {
      if (!spiralEnabled) {
        return;
      }

      if (isSpiderfier && markers.length > 0) {
        const allSpiderMarkers = [];
        let spiralChildren = [];
        markers.map((marker, i) => {
          if (marker.properties.cluster) {
            spiralChildren = superCluster.getLeaves(
              marker.properties.cluster_id,
              Infinity,
            );
          }
          const positions = generateSpiral(marker, spiralChildren, markers, i);
          allSpiderMarkers.push(...positions);
        });

        updateSpiderMarker(allSpiderMarkers);
      } else {
        updateSpiderMarker([]);
      }
    }, [isSpiderfier, markers]);

    const _onRegionChangeComplete = (region) => {
      if (superCluster && region) {
        const bBox = calculateBBox(region);
        const zoom = returnMapZoom(region, bBox, minZoom);
        const markers = superCluster.getClusters(bBox, zoom);
        if (animationEnabled && Platform.OS === 'ios') {
          LayoutAnimation.configureNext(layoutAnimationConf);
        }
        if (zoom >= 18 && markers.length > 0 && clusterChildren) {
          if (spiralEnabled) {
            updateSpiderfier(true);
          }
        } else if (spiralEnabled) {
          updateSpiderfier(false);
        }
        updateMarkers(markers);
        onMarkersChange(markers);
        onRegionChangeComplete(region, markers);
        updateRegion(region);
      } else {
        onRegionChangeComplete(region);
      }
    };

    const _onClusterPress = (cluster) => () => {
      const children = superCluster.getLeaves(cluster.id, Infinity);
      updateClusterChildren(children);

      if (preserveClusterPressBehavior) {
        onClusterPress(cluster, children);
        return;
      }

      const coordinates = children.map(({ geometry }) => ({
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: restProps.edgePadding,
      });

      onClusterPress(cluster, children);
    };
    // console.log('marker', { markers });

    return (
      <MapView
        // provider={'google'}
        loadingEnabled
        {...restProps}
        ref={(map) => {
          mapRef.current = map;
          if (ref) {
            ref.current = map;
          }
          restProps.mapRef(map);
        }}
        onRegionChangeComplete={_onRegionChangeComplete}
      >
        {markers.map((marker) =>
          marker.properties.point_count === 0 ? (
            propsChildren[marker.properties.index]
          ) : !isSpiderfier ? (
            renderCluster ? (
              renderCluster({
                onPress: _onClusterPress(marker),
                clusterColor,
                clusterTextColor,
                clusterFontFamily,
                ...marker,
              })
            ) : (
              <ClusterMarker
                key={`cluster-${marker.id}`}
                {...marker}
                onPress={_onClusterPress(marker)}
                clusterColor={
                  restProps.selectedClusterId === marker.id
                    ? restProps.selectedClusterColor
                    : clusterColor
                }
                clusterTextColor={clusterTextColor}
                clusterFontFamily={clusterFontFamily}
                tracksViewChanges={tracksViewChanges}
              />
            )
          ) : null,
        )}

        {otherChildren}
        <>
          {spiderMarkers.map((marker) =>
            propsChildren[marker.index]
              ? React.cloneElement(propsChildren[marker.index], {
                  coordinate: { ...marker },
                })
              : null,
          )}
        </>
        {spiderMarkers.map((marker, index) => (
          <Polyline
            key={index}
            coordinates={[marker.centerPoint, marker, marker.centerPoint]}
            strokeColor={spiderLineColor}
            strokeWidth={1}
          />
        ))}
      </MapView>
    );
  },
);

ClusteredMapView.defaultProps = {
  clusteringEnabled: true,
  spiralEnabled: true,
  animationEnabled: true,
  preserveClusterPressBehavior: false,
  layoutAnimationConf: LayoutAnimation.Presets.spring,
  tracksViewChanges: false,
  // SuperCluster parameters
  radius: Dimensions.get('window').width * 0.25,
  maxZoom: 20,
  minZoom: 1,
  minPoints: 2,
  extent: 512,
  nodeSize: 64,
  // Map parameters
  edgePadding: {
    top: 50,
    left: 50,
    right: 50,
    bottom: 50,
  },
  // Cluster styles
  clusterColor: '#00B386',
  clusterTextColor: '#FFFFFF',
  spiderLineColor: '#FF0000',
  // Callbacks
  onRegionChangeComplete: () => {},
  onClusterPress: () => {},
  onMarkersChange: () => {},
  superClusterRef: {},
  mapRef: () => {},
};

export default memo(ClusteredMapView);
