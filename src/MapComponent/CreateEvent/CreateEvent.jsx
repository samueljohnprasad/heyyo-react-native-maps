/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Switch,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  ArrowLongRightIcon,
  CalendarDaysIcon,
  ClockIcon,
} from 'react-native-heroicons/outline';
import dayjs from 'dayjs';
import Slider from '@react-native-community/slider';
import { useAtom } from 'jotai';
import SFProText from '../../components/SFProText';
import { createEventAtom } from '../../store/atoms';
import { getTime } from '../../utils/helpers';
import EventView from './EventView';
import PollComponent from '../../components/PollComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafb',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#eef0f4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  textarea: {
    height: 100,
    borderColor: '#eef0f4',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top', // Ensures the text starts at the top of the textarea
  },
});

function FormComponent({ state, handleDateChange }) {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={state.title}
          onChangeText={(value) => handleDateChange('title', value)}
          placeholder="Enter title"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.textarea}
          value={state.description}
          onChangeText={(value) => handleDateChange('description', value)}
          placeholder="Enter description"
          multiline
          numberOfLines={4}
        />
      </View>
    </>
  );
}

function CreateEvent() {
  const [state, setState] = useAtom(createEventAtom);

  const toggleSwitch = () => {
    setState((prevState) => ({
      ...prevState,
      isEnabled: !prevState.isEnabled,
    }));
  };

  const handleDateChange = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const sampleEvent = {
    title: 'Tech Conference 2024',
    description:
      'A conference bringing together technology enthusiasts from around the world.',
    date: '2024-09-15T00:00:00.000Z',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    location: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749], // San Francisco, CA coordinates
    },
    radius: 100,
    creator: '60d0fe4f5311236168a109ca', // Sample user ID
    attendees: [
      '60d0fe4f5311236168a109ca',
      '60d0fe4f5311236168a109cb',
      '60d0fe4f5311236168a109cc',
      '60d0fe4f5311236168a109ddcc',
    ],
    photos: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
      'https://example.com/photo3.jpg',
      'https://example.com/photo3.jpg',
    ],
    approvalRequired: false,
    chat: [
      {
        user: '60d0fe4f5311236168a109ca',
        message: 'Looking forward to this event!',
        createdAt: '2024-06-01T10:30:00.000Z',
      },
      {
        user: '60d0fe4f5311236168a109cb',
        message: "Can't wait!",
        createdAt: '2024-06-02T11:00:00.000Z',
      },
      {
        user: '60d0fe4f5311236168a109cb',
        message: "Can't wait!",
        createdAt: '2024-06-02T11:00:00.000Z',
      },
    ],
    createdAt: '2024-05-15T08:00:00.000Z',
  };
  const [options, setOptions] = useState(['Yes', 'No', '']);

  return (
    <View
      className="flex flex-col bg-white items-center justify-start pt-4 flex-1 px-4"
      style={{ gap: 30 }}
    >
      <View
        className="flex flex-col w-full rounded-lg p-4 border border-gray-300 "
        style={{
          backgroundColor: '#f8fafb',
          borderColor: '#eef0f4',
          borderWidth: 1,
          gap: 10,
        }}
      >
        <View className="flex flex-row gap-2">
          <Pressable
            className="flex gap-1 flex-1 flex-row justify-start items-center px-4 bg-white rounded-lg py-3"
            onPress={() => handleDateChange('startOpen', true)}
          >
            <ClockIcon />
            <Text>{getTime(state.startTime)}</Text>
          </Pressable>
          <View
            style={{
              width: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ArrowLongRightIcon />
          </View>
          <Pressable
            className="flex gap-1 flex-1 flex-row justify-start items-center px-4 bg-white rounded-lg py-3"
            onPress={() => handleDateChange('endOpen', true)}
          >
            <ClockIcon />
            <Text>{getTime(state.endTime)}</Text>
          </Pressable>
        </View>
        <Pressable
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={() => handleDateChange('dateOpen', true)}
        >
          <View className="flex flex-row w-full justify-start gap-2 items-center px-3">
            <CalendarDaysIcon />
            <Text className="text-lg font-medium">
              {dayjs(state.selectedDate).format('dddd, MMMM D')}
            </Text>
          </View>
        </Pressable>
      </View>
      <View
        className="flex flex-col w-full rounded-lg p-4 border border-gray-300 "
        style={{
          backgroundColor: '#f8fafb',
          borderColor: '#eef0f4',
          borderWidth: 1,
          gap: 10,
        }}
      >
        <View className="flex flex-row gap-2 justify-start items-center">
          <Text>need approval</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={state.isEnabled}
          />
        </View>
        <View>
          <SFProText fontFamily="SFProTextMedium">{`${state.sliderKm}-kms`}</SFProText>
          <Slider
            style={{ width: '100%', height: 40 }}
            value={state.sliderKm}
            minimumValue={0}
            maximumValue={100}
            step={1}
            tapToSeek
            onValueChange={(value) => handleDateChange('sliderKm', value)}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="grey"
          />
        </View>
      </View>
      <View
        className="flex flex-col w-full rounded-lg p-4 border border-gray-300 "
        style={{
          backgroundColor: '#f8fafb',
          borderColor: '#eef0f4',
          borderWidth: 1,
          gap: 10,
        }}
      >
        <FormComponent handleDateChange={handleDateChange} state={state} />
      </View>
      <DatePicker
        modal
        minimumDate={new Date()}
        mode="time"
        open={state.startOpen}
        date={state.startTime}
        onConfirm={(date) => {
          handleDateChange('startOpen', false);
          handleDateChange('startTime', date);
        }}
        onCancel={() => {
          handleDateChange('startOpen', false);
        }}
      />
      <DatePicker
        modal
        minimumDate={state.startTime}
        mode="time"
        open={state.endOpen}
        date={state.endTime}
        onConfirm={(date) => {
          handleDateChange('endOpen', false);
          handleDateChange('endTime', date);
        }}
        onCancel={() => {
          handleDateChange('endOpen', false);
        }}
      />
      <DatePicker
        modal
        minimumDate={new Date()}
        mode="date"
        open={state.dateOpen}
        date={state.selectedDate}
        onConfirm={(date) => {
          handleDateChange('dateOpen', false);
          handleDateChange('selectedDate', date);
        }}
        onCancel={() => {
          handleDateChange('dateOpen', false);
        }}
      />
    </View>
  );
}

// <>
//   <EventView event={sampleEvent} />
//   <View className="flex justify-center items-center">
//     <PollComponent
//       question="Do you like this poll feature?"
//       options={options}
//       setOptions={setOptions}
//     />
//   </View>
// </>

export default CreateEvent;
