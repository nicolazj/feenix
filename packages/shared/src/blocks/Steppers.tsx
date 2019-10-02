import React from 'react';
import { ScrollView, View } from 'react-native';

import { Screen, Screens } from '../components/Screens';
import StepConfirm from './steps/StepConfirm';
import StepContact from './steps/StepContact';
import StepOnsite from './steps/StepOnsite';
import StepProducts from './steps/StepProducts';
import StepSiteAccess from './steps/StepSiteAccess';
import StepSubscriberInfo from './steps/StepSubscriberInfo';

const Steppers = () => {
  return (
    <Screens style={{ flex: 1, overflow: 'hidden' }}>
      <Screen>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
          <StepSubscriberInfo />
        </ScrollView>
      </Screen>
      <Screen>
        <View style={{ flex: 1 }}>
          <StepProducts />
        </View>
      </Screen>
      <Screen>
        <View style={{ flex: 1 }}>
          <StepSiteAccess />
        </View>
      </Screen>
      <Screen>
        <View style={{ flex: 1 }}>
          <StepOnsite />
        </View>
      </Screen>
      <Screen>
        <View style={{ flex: 1 }}>
          <StepContact />
        </View>
      </Screen>

      <Screen>
        <View style={{ flex: 1 }}>
          <StepConfirm />
        </View>
      </Screen>
    </Screens>
  );
};

export default Steppers;
