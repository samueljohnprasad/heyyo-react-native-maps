/* eslint-disable object-curly-newline */
import React from 'react';
import { Pressable, View, Platform, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import SFProText from '../../components/SFProText';
import { getImage } from '../../utils/helpers';
import { useAuth } from '../../../AuthContext';

const data = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
  // Add more data as needed
];
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
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: 40,
        // backgroundColor: '#F0F0F0',
        flex: 1,
      }}
    >
      <SFProText
        fontFamily="SFProTextMedium"
        style={{ fontSize: 20, fontWeight: '800' }}
      >
        Profile
      </SFProText>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 1,
          width: '100%',
        }}
      >
        {/* <SFProText
          fontFamily="SFProTextMedium"
          style={{ fontSize: 16, fontWeight: 'bold' }}
        >
          {userDetails.userName}
        </SFProText> */}
        <Pressable onPress={onPressProfile}>
          <View
            style={[
              ProfileStyles.circle,
              { borderColor: 'black', shadowColor: 'black' },
              { width: 62, height: 62 },
            ]}
          >
            {getImage(userDetails.imageId)}
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigate('profile-image-change');
          }}
        >
          <View
            style={{
              paddingBottom: 5,
              paddingTop: 5,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: 'white',
              borderRadius: 10,
            }}
          >
            <SFProText
              fontFamily="SFProTextRegular"
              style={{
                fontSize: 16,
                fontWeight: '700',
                textDecorationLine: 'underline',
              }}
            >
              Edit photo
            </SFProText>
          </View>
        </Pressable>
        <View style={{ width: '100%', paddingLeft: 20, paddingRight: 20 }}>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ListItem
                containerStyle={{
                  borderTopLeftRadius: index === 0 ? 10 : 0,
                  borderTopRightRadius: index === 0 ? 10 : 0,
                  borderBottomLeftRadius: index === data.length - 1 ? 10 : 0,
                  borderBottomRightRadius: index === data.length - 1 ? 10 : 0,
                }}
                pad={10}
                title="sam"
                chevron
                bottomDivider={index !== data.length - 1}
              >
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem>
            )}
          />
        </View>
      </View>
    </View>
  );
}
// text underline
// <Text style={{ textDecorationLine: 'underline' }}>Underline text</Text>

export default Profile;
