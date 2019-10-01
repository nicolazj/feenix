import _debounce from 'lodash.debounce';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Layout } from 'react-native-ui-kitten';

import { AppHeader } from './AppHeader';
import Steppers from './blocks/Steppers';
import Form from './components/Form';

const App = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <AppHeader />
        <Form>
          <Steppers />
        </Form>
      </SafeAreaView>
    </Layout>
  );
};
export default App;
