import React, { useState } from 'react';
import {
    Button, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput,
    View
} from 'react-native';

import api from './api';
import { AppHeader } from './AppHeader';

export function App() {
  const [username, setName] = useState('arvtester@mailinator.com');
  const [password, setPwd] = useState('tester1');
  const signIn = async () => {
    console.log('sign in');
    const data = await api.user.auth.login({ username, password });
    console.log(data)
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <AppHeader />

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <View style={styles.formControl}>
                <TextInput
                  value={username}
                  onChangeText={setName}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.formControl}>
                <TextInput
                  value={password}
                  onChangeText={setPwd}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.formControl}>
                <Button title="Sign in" onPress={signIn}></Button>
              </View>
            </View>
            <View style={styles.sectionContainer}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1, padding: 5 },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  formControl: {
    padding: 10,
  },
});
