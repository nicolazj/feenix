import React, { useContext, useState } from 'react';
import { useField, useForm } from 'react-jeff';
import { ScrollView, View } from 'react-native';
import {
    Button, CheckBox, Layout, ListItem, Modal, Text
} from 'react-native-ui-kitten';

import { FormContext } from '../../components/Form';
import { ScreensContext } from '../../components/Screens';
import { JInput } from '../../forms';
import styles from './styles';

const StepConfirm = () => {
  const { prequal } = useContext(FormContext);
  const { cur, next, prev } = useContext(ScreensContext);
  const [modalVisible, modalVisibleSet] = useState(false);
  const orderContactName = useField({
    defaultValue: '',
  });
  const orderContactNumber = useField({
    defaultValue: '',
  });
  const orderContactEmail = useField({
    defaultValue: '',
  });

  function onSubmit() {
    console.log('submit');
  }
  const form = useForm({
    fields: [orderContactName, orderContactNumber, orderContactEmail],
    onSubmit: onSubmit,
  });

  const PlaceOrder = () => {
    modalVisibleSet(true);
  };
  const confirmPlaceOrder = () => {
    modalVisibleSet(false);
  };
  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <Text category="h4">Confirm order</Text>
      </View>

      <View style={styles.buttonBlock}>
        <Button
          onPress={() => {
            prev();
          }}
        >
          Back
        </Button>
        <Button onPress={PlaceOrder}>Place order</Button>
      </View>
      <Modal
        visible={modalVisible}
        allowBackdrop={true}
        backdropStyle={{ backgroundColor: 'black', opacity: 0.5 }}
      >
        <Layout style={{ flex: 1, width: 300, padding: 20 }}>
          <Text category="h4"> Confirm place order</Text>
          <Text style={{ padding: 20 }}>
            Please confirm you wish to place this order. If you do continue to
            the next stage you are instructing us to place orders with our
            upstream providers, which in most cases will incur costs to your
            account.
          </Text>
          <Button onPress={confirmPlaceOrder}> Place Order</Button>
        </Layout>
      </Modal>
    </View>
  );
};

export default StepConfirm;
