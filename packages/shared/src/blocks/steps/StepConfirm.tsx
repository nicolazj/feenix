import React, { useContext, useState } from 'react';
import { useField, useForm } from 'react-jeff';
import { View } from 'react-native';
import { Button, Layout, Modal, Text } from 'react-native-ui-kitten';

import { LoadingIcon } from '../../components/LoadingIcon';
import { ScreensContext } from '../../components/Screens';
import { JInput, JRadio, JSelect } from '../../forms';
import { useOrderStore } from '../../store/order';
import { T_ADDR_PREQUAL } from '../../types';
import styles from './styles';

const getProductInfo = (prequal: T_ADDR_PREQUAL | undefined, selectedProductId: string) => {
  if (prequal) {
    const selectedProduct = prequal.availableQuickOrderProducts.find(p => p.tailProduct._id === selectedProductId);
    if (selectedProduct) {
      const selectedProductVendorId = selectedProduct.tailProduct.vendor._id;
      const selectedTech = prequal.technologies.find(t => t.technology === selectedProduct.tailProduct.technology);
      if (selectedTech) {
        const selectedTechVendor = selectedTech!.vendors.find(v => v.vendor._id === selectedProductVendorId);
        if (selectedTechVendor) {
          const {
            serviceStatus: { code: serviceStatus },
            installStatus: { code: installStatus },
          } = selectedTechVendor;

          const connectEnabled =
            serviceStatus === 'unknown' || (installStatus === 'installed' && serviceStatus === 'none');
          const migrateEnabled = serviceStatus === 'active' || serviceStatus === 'unknown';
          const existingServices = prequal!.vendorServices.filter(v => v.technology === selectedTech!.technology);

          return {
            connectEnabled,
            migrateEnabled,
            existingServices,
          };
        }
      }
    }
  }
};
const StepConfirm = () => {
  const { prev, next } = useContext(ScreensContext);
  const { prequal, updateForm, form } = useOrderStore(({ prequal, updateForm, form }) => ({
    prequal,
    updateForm,
    form,
  }));
  const [modalVisible, modalVisibleSet] = useState(false);
  const [submitting, submittingSet] = useState(false);

  const aim = useField({
    defaultValue: form.aim,
    required: true,
  });
  const existingServiceId = useField({
    defaultValue: form.existingServiceId,
    required: true,
  });
  const existingServiceProvider = useField({
    defaultValue: form.existingServiceProvider,
    required: true,
  });

  const info = getProductInfo(prequal, form.tailProductId);

  const { connectEnabled, migrateEnabled, existingServices } = info!;

  function onSubmit() {
    updateForm({
      aim: aim.value,
      existingServiceId: existingServiceId.value,
      existingServiceProvider: existingServiceProvider.value,
    });
  }
  const jform = useForm({
    fields: aim.value === 'Migrate' ? [aim, existingServiceId, existingServiceProvider] : [aim],
    onSubmit: onSubmit,
  });

  const goPrev = () => {
    jform.submit();
    prev();
  };
  const PlaceOrder = () => {
    jform.submit();
    modalVisibleSet(true);
  };
  const confirmPlaceOrder = () => {
    submittingSet(true);
    const product = prequal!.availableQuickOrderProducts.find(
      product => product.tailProduct._id === form.tailProductId
    );
    console.log(product);
    const payload = {
      addressId: prequal!.address._id,
      aim: form.aim,
      customerReference: form.customerReference,
      demarc: form.demarc,
      existingServiceId: form.existingServiceId,
      existingServiceProvider: form.existingServiceProvider,
      isBusiness: false,
      orderContactEmail: form.orderContactEmail,
      orderContactName: form.orderContactName,
      orderContactNumber: form.orderContactNumber,
      siteAccessInformation: form.siteAccessInformation,
      siteContactEmail: form.siteContactEmail,
      siteContactName: form.siteContactName,
      siteContactNumber: form.siteContactNumber,
      soldProductId: product!.soldProduct._id,
      subscriberName: form.subscriberName,
      tailProductId: form.tailProductId,
      tailVariantId: form.tailVariantId,
      targetDate: form.targetDate,
    };

    console.log('payload', payload);
    setTimeout(() => {
      modalVisibleSet(false);
      next();
    }, 3000);
  };

  const connectOptions = [
    {
      value: 'New',
      title: 'New Install',
    },
  ];
  if (connectEnabled) {
    connectOptions.push({
      value: 'Connect',
      title: 'Connect',
    });
  }
  if (migrateEnabled) {
    connectOptions.push({
      value: 'Migrate',
      title: 'Migrate Existing Connection',
    });
  }
  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <Text category="h4">Confirm order</Text>
        <View style={styles.formControl}>
          <JRadio label="Connection type" options={connectOptions} {...aim.props} />

          {aim.value === 'Migrate' && (
            <JSelect
              label="Existing Service"
              options={existingServices.map(s => ({
                title: `${s.vendor.name}-${s.id}`,
                value: s.id,
              }))}
              {...existingServiceId.props}
            />
          )}
          {aim.value === 'Migrate' && (
            <JInput label="Existing Service provider" caption="Required" {...existingServiceProvider.props} />
          )}
        </View>
      </View>

      <View style={styles.buttonBlock}>
        <Button onPress={goPrev}>Back</Button>
        <Button disabled={!jform.valid} onPress={PlaceOrder}>
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
          <Button
            onPress={confirmPlaceOrder}
            disabled={submitting}
            icon={submitting ? style => <LoadingIcon style={style} /> : undefined}
          >
            Place Order
          </Button>
        </Layout>
      </Modal>
    </View>
  );
};

export default StepConfirm;
