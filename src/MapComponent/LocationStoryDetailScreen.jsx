import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { fetchStoryById, addContribution } from '../store/locationStorySlice';
import { useAuth } from '../../AuthContext';
import { ShowTime } from '../components/ShowTime';

const UserProfileTag = ({ user, timestamp }) => {
  return (
    <View style={styles.userProfileTag}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          {user.imageId ? (
            <Image
              source={{ uri: `https://picsum.photos/id/${user.imageId}/200` }}
              style={styles.avatar}
            />
          ) : (
            <View style={[styles.avatar, styles.defaultAvatar]}>
              <Text style={styles.defaultAvatarText}>
                {user.userName?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.userName}>{user.userName}</Text>
      </View>
      {timestamp && <ShowTime date={timestamp} style={styles.timestamp} />}
    </View>
  );
};

const ContributionItem = ({ contribution }) => {
  return (
    <View style={styles.contributionItem}>
      <UserProfileTag
        user={contribution.user}
        timestamp={contribution.createdAt}
      />
      <View style={styles.contributionContent}>
        <Text style={styles.contributionText}>{contribution.content}</Text>
        {contribution.media && contribution.media.length > 0 && (
          <Image
            source={{ uri: contribution.media[0] }}
            style={styles.contributionMedia}
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
};

export default function LocationStoryDetailScreen({ route }) {
  const { storyId } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userDetails } = useAuth();
  
  const [newContribution, setNewContribution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentStory, loading, error } = useSelector(
    (state) => state.locationStory
  );

  useEffect(() => {
    dispatch(fetchStoryById(storyId));
  }, [dispatch, storyId]);

  const handleSubmitContribution = async () => {
    if (!newContribution.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Please enter some content',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        addContribution({
          storyId,
          content: newContribution.trim(),
        })
      ).unwrap();
      
      setNewContribution('');
      Toast.show({
        type: 'success',
        text1: 'Contribution added successfully',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Failed to add contribution',
        text2: err.message || 'Please try again',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !currentStory) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00B386" />
        <Text style={styles.loadingText}>Loading story...</Text>
      </View>
    );
  }

  if (error && !currentStory) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color="#FF6B6B" />
        <Text style={styles.errorText}>Failed to load story</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchStoryById(storyId))}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentStory) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="not-interested" size={48} color="#FF6B6B" />
        <Text style={styles.errorText}>Story not found</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Story</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.storyHeader}>
          <Text style={styles.storyTitle}>{currentStory.title}</Text>
          <View style={styles.locationIndicator}>
            <Ionicons name="location" size={16} color="#00B386" />
            <Text style={styles.locationText}>
              {currentStory.location.coordinates[1].toFixed(6)}, 
              {currentStory.location.coordinates[0].toFixed(6)}
            </Text>
          </View>
          <Text style={styles.storyDescription}>{currentStory.description}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.creatorContainer}>
              <Text style={styles.metaLabel}>Created by:</Text>
              <UserProfileTag
                user={currentStory.creator}
                timestamp={currentStory.createdAt}
              />
            </View>

            {currentStory.tags && currentStory.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                <Text style={styles.metaLabel}>Tags:</Text>
                <View style={styles.tagsList}>
                  {currentStory.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.contributionsContainer}>
          <Text style={styles.contributionsTitle}>
            Contributions ({currentStory.contributions?.length || 0})
          </Text>
          
          {currentStory.contributions && currentStory.contributions.length > 0 ? (
            currentStory.contributions.map((contribution, index) => (
              <ContributionItem key={index} contribution={contribution} />
            ))
          ) : (
            <View style={styles.emptyContributions}>
              <Text style={styles.emptyText}>No contributions yet.</Text>
              <Text style={styles.emptySubtext}>Be the first to contribute to this story!</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.contributionInputContainer}>
        <TextInput
          style={styles.contributionInput}
          placeholder="Add your contribution..."
          value={newContribution}
          onChangeText={setNewContribution}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.submitButton,
            (isSubmitting || !newContribution.trim()) && styles.disabledButton,
          ]}
          onPress={handleSubmitContribution}
          disabled={isSubmitting || !newContribution.trim()}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="send" size={20} color="#fff" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00B386',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00B386',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButtonIcon: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  scrollContent: {
    flex: 1,
  },
  storyHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  locationIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  storyDescription: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 16,
  },
  metaContainer: {
    marginTop: 12,
  },
  creatorContainer: {
    marginBottom: 12,
  },
  metaLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  userProfileTag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  defaultAvatar: {
    backgroundColor: '#00B386',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultAvatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  tagsContainer: {
    marginBottom: 12,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#f0f9f6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d4f0e8',
  },
  tagText: {
    color: '#00B386',
    fontSize: 12,
  },
  contributionsContainer: {
    padding: 16,
  },
  contributionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  contributionItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 16,
  },
  contributionContent: {
    marginLeft: 44,
    marginTop: 4,
  },
  contributionText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  contributionMedia: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginTop: 12,
  },
  emptyContributions: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
  contributionInputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  contributionInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 15,
  },
  submitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00B386',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#b0e0d7',
  },
});
