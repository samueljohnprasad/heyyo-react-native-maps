import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { createPoll } from '../store/pollSlice';

const POLL_RADIUS_OPTIONS = [100, 250, 500, 1000, 2000, 5000];
const POLL_EXPIRY_OPTIONS = [1, 3, 7]; // days

export default function PollCreationScreen({ route, navigation }) {
  const { latitude, longitude } = route.params || {};
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [radius, setRadius] = useState(500);
  const [expiry, setExpiry] = useState(3);
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!topic.trim()) newErrors.topic = 'Topic is required';
    if (options.some(opt => !opt.trim()) || options.length < 2)
      newErrors.options = 'At least two options are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOptionChange = (idx, value) => {
    setOptions(prev => prev.map((opt, i) => (i === idx ? value : opt)));
  };

  const handleAddOption = () => {
    setOptions(prev => [...prev, '']);
  };

  const handleRemoveOption = idx => {
    if (options.length > 2) {
      setOptions(prev => prev.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await dispatch(
        createPoll({
          title: title.trim(),
          topic: topic.trim(),
          options: options.map(opt => opt.trim()),
          location: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          radius,
          expiresAt: new Date(Date.now() + expiry * 24 * 60 * 60 * 1000),
          anonymous,
        })
      ).unwrap();
      navigation.goBack();
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to create poll' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create a Poll</Text>
      <TextInput
        style={[styles.input, errors.title && styles.inputError]}
        placeholder="Poll Title"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />
      {errors.title && <Text style={styles.error}>{errors.title}</Text>}

      <TextInput
        style={[styles.input, errors.topic && styles.inputError]}
        placeholder="Topic (e.g., Local Event, Zoning, etc.)"
        value={topic}
        onChangeText={setTopic}
        maxLength={50}
      />
      {errors.topic && <Text style={styles.error}>{errors.topic}</Text>}

      <Text style={styles.label}>Options (min 2):</Text>
      {options.map((option, idx) => (
        <View key={idx} style={styles.optionRow}>
          <TextInput
            style={[styles.input, styles.optionInput, errors.options && styles.inputError]}
            placeholder={`Option ${idx + 1}`}
            value={option}
            onChangeText={val => handleOptionChange(idx, val)}
            maxLength={60}
          />
          {options.length > 2 && (
            <TouchableOpacity onPress={() => handleRemoveOption(idx)}>
              <Text style={styles.removeBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity onPress={handleAddOption} style={styles.addOptionBtn}>
        <Text style={styles.addOptionText}>+ Add Option</Text>
      </TouchableOpacity>
      {errors.options && <Text style={styles.error}>{errors.options}</Text>}

      <Text style={styles.label}>Poll Radius (meters):</Text>
      <View style={styles.choicesRow}>
        {POLL_RADIUS_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[styles.radiusBtn, radius === opt && styles.radiusBtnActive]}
            onPress={() => setRadius(opt)}
          >
            <Text style={radius === opt ? styles.radiusTextActive : styles.radiusText}>{opt}m</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Expires In:</Text>
      <View style={styles.choicesRow}>
        {POLL_EXPIRY_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[styles.radiusBtn, expiry === opt && styles.radiusBtnActive]}
            onPress={() => setExpiry(opt)}
          >
            <Text style={expiry === opt ? styles.radiusTextActive : styles.radiusText}>{opt}d</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Anonymous?</Text>
        <TouchableOpacity onPress={() => setAnonymous(a => !a)} style={styles.checkbox}>
          <Text style={styles.checkboxText}>{anonymous ? '✔' : ''}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Create Poll</Text>}
      </TouchableOpacity>
      {errors.submit && <Text style={styles.error}>{errors.submit}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10, fontSize: 16 },
  inputError: { borderColor: '#FF6B6B' },
  label: { fontWeight: '500', marginTop: 10, marginBottom: 6 },
  optionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  optionInput: { flex: 1 },
  removeBtn: { color: '#FF6B6B', fontWeight: 'bold', fontSize: 18, marginLeft: 8 },
  addOptionBtn: { marginBottom: 10 },
  addOptionText: { color: '#00B386', fontWeight: 'bold' },
  choicesRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  radiusBtn: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginRight: 8, marginBottom: 6 },
  radiusBtnActive: { backgroundColor: '#00B386', borderColor: '#00B386' },
  radiusText: { color: '#333' },
  radiusTextActive: { color: '#fff', fontWeight: 'bold' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: { width: 24, height: 24, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  checkboxText: { fontSize: 16 },
  submitBtn: { backgroundColor: '#00B386', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  submitText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  error: { color: '#FF6B6B', marginBottom: 8 },
});
