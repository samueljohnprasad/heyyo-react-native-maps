/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import DatePicker from 'react-native-date-picker';

const styles = StyleSheet.create({
  sheetContainer: {
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

function DetachModal() {
  // ref
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // renders
  return (
    <BottomSheet
      snapPoints={snapPoints}
      enablePanDownToClose
      backgroundStyle={{ backgroundColor: '#4e2626' }}
      // add bottom inset to elevate the sheet
      bottomInset={46}
      // set `detached` to true
      detached
      style={styles.sheetContainer}
    >
      <View style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </View>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(datee) => {
          setOpen(false);
          setDate(datee);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </BottomSheet>
  );
}

export default DetachModal;
