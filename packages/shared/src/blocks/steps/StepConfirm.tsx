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
  const { prequal, form } = useContext(FormContext);
  const { prev } = useContext(ScreensContext);
  const [modalVisible, modalVisibleSet] = useState(false);

  const selectedProductId = form.selectedProducts[0];
  const selectedProduct = prequal!.availableComponentProducts.find(
    p => p.product._id === selectedProductId
  );

  console.log('selectedProduct', selectedProduct);

  const selectedProductVendorId =
    selectedProduct && selectedProduct.product.vendor._id;
  console.log('selectedProductVendorId', selectedProductVendorId);

  const selectedTech = prequal!.technologies.find(
    t => t.technology === selectedProduct!.product.technology
  );
  console.log('selectedTech', selectedTech);

  const selectedTechVendor = selectedTech!.vendors.find(
    v => v.vendor._id === selectedProductVendorId
  );
  console.log('selectedTechVendor', selectedTechVendor);

  const {
    serviceStatus: { code: serviceStatus },
    installStatus: { code: installStatus },
  } = selectedTechVendor!;
  const connectEnabled =
    serviceStatus === 'unknown' ||
    (installStatus === 'installed' && serviceStatus === 'none');
  const migrateEnabled =
    serviceStatus === 'active' || serviceStatus === 'unknown';

  console.log(connectEnabled, migrateEnabled);

  function onSubmit() {
    console.log('submit');
  }
  const jform = useForm({
    fields: [],
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
