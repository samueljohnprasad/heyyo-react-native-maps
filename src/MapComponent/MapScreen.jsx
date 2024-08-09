import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    top: 190,
    right: 20,
    height: 40,
    width: 40,
    flexDirectio: 'row',
    direction: 'ltr',
    float: 'right',
    backgroundColor: 'green',
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});

function MapScreen() {
  <View style={styles.iconContainer}>
    <TouchableOpacity style={styles.icon}>
      <MaterialIcons name="search" size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.icon}>
      <MaterialIc name="settings" size={24} color="black" />
    </TouchableOpacity>
  </View>;
  <MaterialIcons name="search" size={24} color="black" />;
}

export default MapScreen;
