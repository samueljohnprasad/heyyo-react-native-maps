import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const styler = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    filter: 'blur(10px)',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(https://www.w3schools.com/html/pic_trulli.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  textOverlay: {
    position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

function App() {
  return (
    <View style={styler.container}>
      <View style={styler.imageOverlay} />
      <View style={styler.textOverlay}>
        <Text>This is a blurred image with a text overlay.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  map: {
    flex: 1,
  },
  markers: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

function TestComp() {
  const markers = [
    {
      coordinate: {
        latitude: 17.385,
        longitude: 78.4867,
      },

      title: 'Marker 1',
    },
  ];

  useEffect(() => {
    console.log('mounting');

    return () => {
      console.log('unmounting');
    };
  }, []);

  return (
    // <View style={styles.container}>
    //   <MapView
    //     style={styles.map}
    //     region={{
    //       latitude: 17.385,
    //       longitude: 78.4867,
    //       latitudeDelta: 0.05,
    //       longitudeDelta: 0.05,
    //     }}
    //   >
    //     {markers.map((marker) => (
    //       <Marker
    //         key={marker.title}
    //         coordinate={marker.coordinate}
    //         title={marker.title}
    //       >
    //         {/* <View style={styles.marker}> */}
    //         <App />
    //         <Text>This is a blurred image with a text overlay.</Text>
    //         {/* <Text style={styles.markerText}>{marker.title}</Text> */}
    //         {/* </View> */}
    //       </Marker>
    //     ))}
    //   </MapView>
    // </View>
    <></>
  );
}

export default TestComp;
