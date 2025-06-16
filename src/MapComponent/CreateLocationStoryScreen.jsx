import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { createLocationStory } from '../store/locationStorySlice';
import { useAuth } from '../../AuthContext';

export default function CreateLocationStoryScreen({ route }) {
  const { latitude, longitude } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userDetails } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!initialContent.trim()) {
      newErrors.initialContent = 'Initial contribution is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateStory = async () => {
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      await dispatch(createLocationStory({
        title: title.trim(),
        description: description.trim(),
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        initialContribution: initialContent.trim(),
        tags: tagsArray,
      })).unwrap();
      
      Toast.show({
        type: 'success',
        text1: 'Story created successfully',
      });
      
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to create story',
        text2: error.message || 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Location Story</Text>
      </View>

      <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.locationInfoContainer}>
          <View style={styles.locationIndicator}>
            <Ionicons name="location" size={16} color="#00B386" />
            <Text style={styles.locationText}>
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </Text>
          </View>
          <Text style={styles.locationHelp}>
            Your story will be pinned to this location
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Title *</Text>
          <TextInput
            style={[styles.textInput, errors.title && styles.inputError]}
            value={title}
            onChangeText={setTitle}
            placeholder="Give your location story a title"
            placeholderTextColor="#999"
            maxLength={100}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Description *</Text>
          <TextInput
            style={[
              styles.textInput,
              styles.textAreaInput,
              errors.description && styles.inputError,
            ]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe what this location story is about"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Initial Contribution *</Text>
          <TextInput
            style={[
              styles.textInput,
              styles.textAreaInput,
              errors.initialContent && styles.inputError,
            ]}
            value={initialContent}
            onChangeText={setInitialContent}
            placeholder="Start the story with your first contribution"
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          {errors.initialContent && (
            <Text style={styles.errorText}>{errors.initialContent}</Text>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Tags (comma separated)</Text>
          <TextInput
            style={styles.textInput}
            value={tags}
            onChangeText={setTags}
            placeholder="history, architecture, nature, etc."
            placeholderTextColor="#999"
          />
          <Text style={styles.helperText}>
            Add relevant tags to help others discover your story
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.disabledButton]}
          onPress={handleCreateStory}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.submitButtonText}>Create Story</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  formContainer: {
    padding: 16,
  },
  locationInfoContainer: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  locationIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
    fontWeight: '500',
  },
  locationHelp: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  textAreaInput: {
    minHeight: 100,
    paddingTop: 12,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  helperText: {
    color: '#777',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#00B386',
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#b0e0d7',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});
