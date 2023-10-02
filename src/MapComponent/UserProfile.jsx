import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../AuthContext';

export default function UserProfile() {
  const { logout, userDetails } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{userDetails.userName}</Text>
      <Button onPress={logout} title="Logout" />
    </View>
  );
}
