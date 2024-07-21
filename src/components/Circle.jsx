/* eslint-disable object-curly-newline */
/* eslint-disable react/no-array-index-key */
import { Platform, StyleSheet, Text, View } from 'react-native';
import { getImage } from '../utils/helpers';

const styles = StyleSheet.create({
  containerr: {
    flex: 1,
    padding: 5,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderRadius: 50,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    overflow: 'visible',
    borderColor: 'black',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5.84,
      },
    }),
  },
  imagesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pin1: {
    position: 'relative',
    borderRadius: 50,
    borderTopEndRadius: 50,
    borderBottomEndRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 1,
    transform: [{ rotate: '-45deg' }],
    backgroundColor: 'yellow',
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function Circle({ zIndex, top, index, imageId }) {
  return (
    <View
      style={[
        styles.circle,
        {
          zIndex,
          elevation: zIndex,
          top,
          marginLeft: index ? -10 : 0,
        },
      ]}
    >
      {getImage(imageId)}
    </View>
  );
}

export function IntersectingCircles({ count, cluster }) {
  if (cluster.length === 1) {
    return (
      <View style={[styles.pin1]}>
        <View
          style={{
            transform: [{ rotate: '45deg' }],
            zIndex: 9999999,
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: '#fff',
            overflow: 'visible',
            borderColor: 'black',
            borderWidth: 1,
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 1.84,
              },
            }),
          }}
        >
          {getImage(cluster?.[0]?.user?.imageId)}
        </View>
      </View>
    );
  }
  const newClusters = cluster.length > 3 ? cluster.slice(0, 3) : cluster;
  return (
    <View style={styles.containerr}>
      <View style={styles.imagesWrapper}>
        {newClusters.map((post, index) => (
          // console.log('newClusters', post, newClusters.length);
          <Circle
            imageId={post.user?.imageId || 0}
            key={index}
            zIndex={count - index}
            top={0}
            index={index}
          />
        ))}
      </View>
      {cluster.length > 3 && (
        <Text style={{ fontSize: 18, paddingRight: 5, fontWeight: 800 }}>
          {`+${cluster.length - 3}`}
        </Text>
      )}
    </View>
  );
}
