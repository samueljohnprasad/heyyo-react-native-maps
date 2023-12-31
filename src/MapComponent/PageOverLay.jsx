import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    opacity: '0.7',
  },
});

function PageOverLay({ isLoading, children }) {
  return (
    <>
      {children}
      {isLoading && (
        <View style={styles.modalBackground}>
          <ActivityIndicator
            color="white"
            style={{ opacity: 1 }}
            size="large"
            animating
          />
        </View>
      )}
    </>
  );
}

export default PageOverLay;
