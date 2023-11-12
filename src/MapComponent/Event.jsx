/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import SFProText from '../components/SFProText';
import Plus from '../ComponentsSvg/Plus';

const data = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
  // Add more data as needed
];
function Event() {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          paddingBottom: 10,
          borderBottomColor: '#E5E5E5',
          borderBottomWidth: 0.3,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <SFProText
          fontFamily="SFProTextMedium"
          style={{ fontSize: 20, fontWeight: 'bold' }}
        >
          Events
        </SFProText>
        <Pressable onPress={() => navigate('CreateEvent')}>
          <Plus />
        </Pressable>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <ListItem title="sam" chevron bottomDivider>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem>
          )}
        />
      </View>
    </View>
  );
}

export default Event;
