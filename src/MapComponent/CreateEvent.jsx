import React from 'react';
import { ScrollView, View } from 'react-native';
import FootBall from '../ComponentsSvg/FootBall';
import Pumpkin from '../ComponentsSvg/Pumpkin';
import Airplane from '../ComponentsSvg/Airplane';
import Holiday from '../ComponentsSvg/Holiday';
import DancingGirl from '../ComponentsSvg/DancingGirl';
import Pizza from '../ComponentsSvg/Pizza';
import PoppingBeer from '../ComponentsSvg/PoppingBeer';
import Rocket from '../ComponentsSvg/Rocket';
import Guitar from '../ComponentsSvg/Guitar';

function CreateEvent() {
  return (
    <View
      style={{
        backgroundColor: '#F7F7F6',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
      }}
    >
      <ScrollView
        horizontal
        contentContainerStyle={{
          flexDirection: 'row',
          height: 50,
          display: 'flex',
          gap: 35,
          borderRadius: 10,
          backgroundColor: '#FFF',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          width: '100%',
          overflow: 'scroll',
        }}
      >
        <FootBall />
        <Pumpkin />
        <Airplane />
        <Holiday />
        <DancingGirl />
        <Pizza />
        <PoppingBeer />
        <Rocket />
        <Guitar />
        <DancingGirl />
        <Pizza />
        <PoppingBeer />
        <Rocket />
        <Guitar />
      </ScrollView>
    </View>
  );
}

export default CreateEvent;
