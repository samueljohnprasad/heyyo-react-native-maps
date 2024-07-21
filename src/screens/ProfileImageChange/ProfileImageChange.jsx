/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useAtom } from 'jotai';
import SFProText from '../../components/SFProText';
import { useAuth } from '../../../AuthContext';
import { ProfileStyles } from '../../MapComponent/modelScreens/Profile';
import { Images, getImage } from '../../utils/helpers';
import { countAtom } from '../../store/atoms';

function ProfileImageChange() {
  const { userDetails } = useAuth();
  const [selectedImage, setSelectedImage] = useAtom(countAtom);

  useEffect(() => {
    setSelectedImage(userDetails.imageId || 0);
  }, [userDetails.imageId]);

  return (
    <View
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F4F7FA',
        height: '100%',
        gap: 40,
      }}
    >
      <View
        style={[
          ProfileStyles.circle,
          { borderColor: 'black', shadowColor: 'black' },
          { width: 102, height: 102 },
        ]}
      >
        {getImage(selectedImage)}
      </View>
      <View style={{ width: '100%', display: 'flex', gap: 10 }}>
        <SFProText
          fontFamily="SFProTextMedium"
          style={{ fontSize: 18, fontWeight: 'bold' }}
        >
          Select an avatar
        </SFProText>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            padding: 20,
          }}
        >
          {Images.map((image, index) => (
            <Pressable onPress={() => setSelectedImage(index)} key={index}>
              <View
                style={[
                  {
                    width: 62,
                    height: 62,
                    borderRadius: 100,
                    backgroundColor: '#fff',
                    padding: 2,
                    overflow: 'visible',
                    borderColor: selectedImage === index ? 'black' : 'white',
                    borderWidth: selectedImage === index ? 2 : 0,
                  },
                ]}
              >
                {image}
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

export default ProfileImageChange;
