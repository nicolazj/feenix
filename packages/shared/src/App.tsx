import _debounce from 'lodash.debounce';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button, Layout } from 'react-native-ui-kitten';

import { Screen, Screens } from './components/Screens';

export function App() {
  const [cur, curSet] = useState(0);
  return (
    <Layout style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Screens style={{ flex: 1 }} cur={cur}>
          <Screen>
            <Text>1</Text>
          </Screen>
          <Screen>
            <Text>2</Text>
          </Screen>
          <Screen>
            <Text>3</Text>
          </Screen>
        </Screens>
        <Button
          onPress={() => {
            curSet((cur + 1) % 3);
          }}
        >
          switch
        </Button>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  formControl: {
    padding: 10,
  },
  section: {
    paddingHorizontal: 12,
  },
});
