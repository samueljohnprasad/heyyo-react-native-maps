/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getImage } from '../../utils/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 5,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    // borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#111827',
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: '#6b7280',
    marginRight: 8,
    fontWeight: '500',
  },
  value: {
    color: '#1f2937',
  },
  photosContainer: {
    marginBottom: 16,
  },
  photo: {
    width: 128,
    height: 128,
    marginRight: 8,
    borderRadius: 12,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  attendeesContainer: {
    marginBottom: 16,
  },
  attendeeImages: {
    flexDirection: 'row',
  },
  attendeeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
  },
  chatContainer: {
    marginBottom: 16,
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  chatContent: {
    flex: 1,
  },
  chatUser: {
    color: '#1f2937',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  chatText: {
    color: '#374151',
    marginBottom: 2,
  },
  chatTime: {
    color: '#6b7280',
    fontSize: 12,
  },
  mapIcon: {
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalAttendee: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalAttendeeAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  modalAttendeeName: {
    color: '#1f2937',
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1f2937',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

function EventView({ event, userId }) {
  const [modalVisible, setModalVisible] = useState(false);

  const renderAttendee = ({ item }) => (
    <View style={styles.modalAttendee}>
      <View
        // source={{ uri: `https://i.pravatar.cc/150?u=${item}` }}
        style={styles.modalAttendeeAvatar}
      >
        {getImage(1)}
      </View>
      <Text style={styles.modalAttendeeName}>{item}</Text>
    </View>
  );

  const openMap = () => {
    const { coordinates } = event.location;
    const url = Platform.select({
      ios: `maps:${coordinates[0]},${coordinates[1]}`,
      android: `geo:${coordinates[0]},${coordinates[1]}`,
    });
    Linking.openURL(url);
  };

  const isUserAccepted = event.attendees.some(
    (attendee) => attendee === userId,
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.description}>{event.description}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>
            {new Date(event.date).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>
            {`${event.startTime} - ${event.endTime}`}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>
            {event.location.coordinates.join(', ')}
          </Text>
          <TouchableOpacity onPress={openMap}>
            <Ionicons
              name="map-outline"
              size={24}
              color="blue"
              style={styles.mapIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Radius:</Text>
          <Text style={styles.value}>{event.radius} meters</Text>
        </View>

        <View style={styles.photosContainer}>
          <Text style={styles.label}>Photos:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {event.photos.map((photo, index) => (
              <View key={index} style={styles.photo}>
                {getImage(1)}
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.attendeesContainer}>
          <Text style={styles.label}>Attendees:</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.attendeeImages}>
              {event.attendees.map((attendee, index) => (
                <View
                  key={index}
                  style={[
                    styles.attendeeAvatar,
                    { marginLeft: index !== 0 ? -10 : 0 },
                  ]}
                >
                  {getImage(1)}
                </View>
              ))}
            </View>
          </TouchableOpacity>
        </View>

        {isUserAccepted && event.chat.length > 0 && (
          <View style={styles.chatContainer}>
            <Text style={styles.label}>Chat:</Text>
            {event.chat.map((chat, index) => (
              <View key={index} style={styles.chatMessage}>
                <View
                  // source={{ uri: `https://i.pravatar.cc/150?u=${chat.user}` }}
                  style={styles.chatAvatar}
                >
                  {getImage(1)}
                </View>
                <View style={styles.chatContent}>
                  <Text style={styles.chatUser}>{chat.user.name}</Text>
                  <Text style={styles.chatText}>{chat.message}</Text>
                  <Text style={styles.chatTime}>
                    {new Date(chat.createdAt).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Attendees</Text>
            <FlatList
              data={event.attendees}
              keyExtractor={(item) => item}
              renderItem={renderAttendee}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default EventView;
