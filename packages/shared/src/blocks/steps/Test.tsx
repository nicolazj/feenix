import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { Button, Layout, Modal, Text } from 'react-native-ui-kitten';

import styles from './styles';

const Test = () => {
  const [modalVisible, modalVisibleSet] = useState(false);

  return (
    <View style={styles.section}>
     <View style={styles.spacer}>
        <Text category="h4">Confirm order</Text>
        <View style={styles.formControl}>
          
       
        </View>
      </View>

      <View style={styles.buttonBlock}>
       
        <Button onPress={()=>modalVisibleSet(true)}>
          Place order
        </Button>
      </View>
      <Modal
        visible={modalVisible}
        allowBackdrop={true}
        onBackdropPress={() => modalVisibleSet(false)}
        backdropStyle={{ backgroundColor: 'black', opacity: 0.5 }}
      >
        <Layout style={{ flex: 1, width: 300, padding: 20 }}>
          <Text category="h4"> Confirm place order</Text>
          <Text style={{ padding: 20 }}>
            Please confirm you wish to place this order. If you do continue to the next stage you are instructing us to
            place orders with our upstream providers, which in most cases will incur costs to your account.
          </Text>
        </Layout>
      </Modal>
    </View>
  );
};

export default Test;
