/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Marker } from 'react-native-maps';

import { returnMarkerStyle } from './helpers';
import { getColorForRange } from './helper';
import { getImage } from '../../utils/helpers';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    position: 'absolute',
    opacity: 0.5,
    zIndex: 0,
  },
  cluster: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontWeight: 'bold',
  },
  textWrapper: {
    position: 'absolute',
    top: -15,
    right: -15,
    padding: 4,
    backgroundColor: 'grey',
    borderRadius: '50%',
    height: 25,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function ClusteredMarker({
  geometry,
  properties,
  onPress,
  clusterColor,
  clusterTextColor,
  clusterFontFamily,
  tracksViewChanges,
  photo,
}) {
  const points = properties.point_count;
  const { photosLength } = properties;
  const { width, height, size } = returnMarkerStyle(points);
  // console.log('photophoto', { photo });
  return (
    <Marker
      key={`${geometry.coordinates[0]}_${geometry.coordinates[1]}`}
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      style={{ zIndex: points + 1 }}
      onPress={onPress}
      tracksViewChanges={tracksViewChanges}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.container, { width, height }]}
      >
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: clusterColor,
              width,
              height,
              borderRadius: width / 2,
            },
          ]}
        />
        <View
          style={[
            styles.cluster,
            {
              backgroundColor: getColorForRange(points),
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          {getImage(photo)}

          <View style={[styles.textWrapper]}>
            <Text
              style={[
                styles.text,
                {
                  color: clusterTextColor,
                  fontFamily: clusterFontFamily,
                },
              ]}
            >
              {photosLength}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Marker>
  );
}

export default memo(ClusteredMarker);
