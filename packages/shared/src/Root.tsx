import React from 'react';
import { ApplicationProvider } from 'react-native-ui-kitten';

import { light as lightTheme, mapping } from '@eva-design/eva';

import App from './App';

const Root = () => (
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <App />
  </ApplicationProvider>
);

export default Root;
