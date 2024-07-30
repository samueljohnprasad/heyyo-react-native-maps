/* eslint-disable object-curly-newline */
import React from 'react';
import { Pressable, View, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SFProText from '../../components/SFProText';
import { getImage } from '../../utils/helpers';
import { useAuth } from '../../../AuthContext';

export const ProfileStyles = StyleSheet.create({
  circle: {
    width: 42,
    height: 42,
    borderRadius: 100,
    backgroundColor: '#fff',
    padding: 2,
    overflow: 'visible',
    borderColor: 'blue',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'blue',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2.84,
      },
    }),
  },
});

function Profile() {
  const { userDetails } = useAuth();
  const { navigate } = useNavigation();
  const onPressProfile = () => {
    navigate('Home');
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '80%',
      }}
    >
      <SFProText
        fontFamily="SFProTextMedium"
        style={{ fontSize: 16, fontWeight: 'bold' }}
      >
        {userDetails.userName}
      </SFProText>
      <Pressable onPress={onPressProfile}>
        <View
          style={[
            ProfileStyles.circle,
            { borderColor: 'black', shadowColor: 'black' },
          ]}
        >
          {getImage(userDetails.imageId)}
        </View>
      </Pressable>
    </View>
  );
}

export default Profile;
