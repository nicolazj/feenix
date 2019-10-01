import React from 'react';
import { Text, View } from 'react-native';

import { Screen, Screens } from '../components/Screens';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

const Steppers = () => {
  return (
    <Screens style={{ flex: 1, overflow: 'hidden' }}>
      <Screen>
        <View style={{ flex: 1 }}>
          <Step1 />
        </View>
      </Screen>
      <Screen>
        <View style={{ flex: 1 }}>
          <Step2 />
        </View>
      </Screen>
      <Screen>
        <View style={{ flex: 1 }}>
          <Step3 />
        </View>
      </Screen>
      <Screen>
        <View style={{ flex: 1 }}>
          <Step4 />
        </View>
      </Screen>
    </Screens>
  );
};

export default Steppers;
