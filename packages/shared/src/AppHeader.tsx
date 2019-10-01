import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export function AppHeader() {
  return <View style={styles.container}>
      <Image style={{width:100,height:100}}resizeMode="contain" source={require('./assets/sky.png')} />
    </View>
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    backgroundColor: '#111',
  },
  text: {
   fontSize: 36,
   fontWeight: '600',
  }
})
