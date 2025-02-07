import React from 'react';
import { ScrollView, View } from 'react-native';

import { Screens } from '../components/Screens';
import StepComplete from './steps/StepComplete';
import StepConfirm from './steps/StepConfirm';
import StepContact from './steps/StepContact';
import StepOnsite from './steps/StepOnsite';
import StepProducts from './steps/StepProducts';
import StepSiteAccess from './steps/StepSiteAccess';
import StepSubscriberInfo from './steps/StepSubscriberInfo';

const Steppers = () => {
  return (
    <Screens style={{ flex: 1, overflow: 'hidden' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <StepSubscriberInfo />
        {/* <Test /> */}
      </ScrollView>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <StepProducts />
      </ScrollView>
      <View style={{ flex: 1 }}>
        <StepSiteAccess />
      </View>
      <View style={{ flex: 1 }}>
        <StepOnsite />
      </View>
      <View style={{ flex: 1 }}>
        <StepContact />
      </View>
      <View style={{ flex: 1 }} >
        <StepConfirm />
      </View>
      <View style={{ flex: 1 }}>
        <StepComplete />
      </View>
    </Screens>
  );
};

export default Steppers;
