import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-ui-kitten';

import styles from './styles';

const StepComplete = () => {
  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <Text category="h4">Successfully placed order</Text>
        <View style={{ paddingVertical: 20 }}>
          <Text category="p1">Congratulations. Your order has been submitted successfully.</Text>
        </View>
      </View>
    </View>
  );
};

export default StepComplete;
