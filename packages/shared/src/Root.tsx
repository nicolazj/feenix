import React from 'react';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';

import { light as lightTheme, mapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import App from './App';

console.log(lightTheme,mapping);
const Root = () => (
  <>
  <IconRegistry icons={EvaIconsPack}/>
  <ApplicationProvider mapping={mapping} theme={lightTheme}>
    <App />
  </ApplicationProvider>
  </>
);

export default Root;
