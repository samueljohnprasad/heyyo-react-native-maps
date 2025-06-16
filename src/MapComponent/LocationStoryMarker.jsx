/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable no-use-before-define */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Callout } from 'react-native-maps';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

export default function LocationStoryMarker({ story, onPress }) {
  console.log('LocationStoryMarker', LocationStoryMarker);
  const { title, location, contributors = [] } = story;

  // Extract coordinates
  const latitude = location.coordinates[1];
  const longitude = location.coordinates[0];
  console.log('contributorCount', latitude, longitude);

  // Count unique contributors
  const contributorCount = contributors.length;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.markerContainer}>
        <View style={styles.markerIconContainer}>
          <FontAwesome5 name="book-open" size={14} color="#fff" />
        </View>
        {contributorCount > 0 && (
          <View style={styles.contributorBadge}>
            <Text style={styles.contributorCount}>{contributorCount}</Text>
          </View>
        )}
      </View>

      <Callout tooltip>
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutTitle}>{title}</Text>
          <View style={styles.calloutMeta}>
            <View style={styles.contributorsInfo}>
              <Ionicons name="people" size={14} color="#00B386" />
              <Text style={styles.contributorsText}>
                {contributorCount} contributor
                {contributorCount !== 1 ? 's' : ''}
              </Text>
            </View>
            <TouchableOpacity style={styles.viewButton} onPress={onPress}>
              <Text style={styles.viewButtonText}>View Story</Text>
              <Ionicons name="arrow-forward" size={14} color="#00B386" />
            </TouchableOpacity>
          </View>
        </View>
      </Callout>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  markerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00B386',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  contributorBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  contributorCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  calloutContainer: {
    width: 200,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  calloutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contributorsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contributorsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewButtonText: {
    fontSize: 12,
    color: '#00B386',
    marginRight: 4,
  },
});
