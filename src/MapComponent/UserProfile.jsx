import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../AuthContext';
import Exit from '../ComponentsSvg/Exit';

export default function UserProfile() {
  const { logout, userDetails } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F7FA',
      }}
    >
      <Text>{userDetails.userName}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Exit />
        <Button
          style={{
            fontFamily: 'SFProTextMedium',
            fontSize: 27,
            fontWeight: 'bold',
            lineHeight: 22,
          }}
          onPress={logout}
          title="Logout"
        />
      </View>
    </View>
  );
}
