import React, { Component, useState } from 'react';
import { useField, useForm } from 'react-jeff';
import { View } from 'react-native';
import { Button, Layout, Modal, Select, Text } from 'react-native-ui-kitten';

import { JSelect } from '../../forms';
import styles from './styles';

export class SelectContainer extends React.Component {
  items = [{ text: 'Option 1' }];

  state = {
    selectedOption: null,
  };

  onSelect = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    return <Select data={this.items} selectedOption={this.state.selectedOption} onSelect={this.onSelect} />;
  }
}

const Test = () => {
  const [modalVisible, modalVisibleSet] = useState(false);
  const tailProductId = useField({
    defaultValue: '',
    required: true,
  });

  function onSubmit() {
    console.log('onSubmit');
  }
  const jform = useForm({
    fields: [tailProductId],
    onSubmit: onSubmit,
  });

  return (
    <View style={styles.section}>
      <View style={styles.spacer}>
        <Text category="h4">Confirm order</Text>
        <View style={styles.formControl}>
          <SelectContainer />
          <JSelect
            label="Products:"
            options={[
              {
                title: '123',
                value: '1',
              },
            ]}
            value={tailProductId.props.value}
            onChange={tailProductId.props.onBlur}
          />

          <JSelect
            label="Products:"
            options={[
              {
                title: '123',
                value: '1',
              },
            ]}
            {...tailProductId.props}
          />
        </View>
      </View>

      <View style={styles.buttonBlock}>
        <Button onPress={() => modalVisibleSet(true)}>Place order</Button>
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
