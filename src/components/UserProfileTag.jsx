import { View, Text, StyleSheet, Pressable } from 'react-native';

import { getImage } from '../utils/helpers';

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e9e9e9',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    padding: 4,
    alignSelf: 'flex-start',
    paddingRight: 10,
  },
});

export default function UserProfileTag({ userName }) {
  return (
    <View style={styles.contentContainer}>
      <Pressable>
        <View style={{ width: 18, height: 18 }}>{getImage(0)}</View>
      </Pressable>
      <Text style={{ color: '#404040', fontWeight: 600 }}>{userName}</Text>
    </View>
  );
}
