import React, { createContext, useEffect, useState } from 'react';

import api from '../api';
import { T_ADDR_PREQUAL, T_Order } from '../types';

const initForm = {
  addressId: '',
  soldProductId: '',
  tailProductId: '',
  aim: '',
  subscriberName: '',
  isBusiness: '',
  customerReference: '',
  tailVariantId: '',
  demarc: '',
  siteAccessInformation: '',
  siteContactName: '',
  siteContactNumber: '',
  siteContactEmail: '',
  targetDate: '',
  orderContactName: '',
  orderContactNumber: '',
  orderContactEmail: '',
  existingServiceId: '',
  existingServiceProvider: '',
};
export const FormContext = createContext<{
  form: T_Order;
  prequal?: T_ADDR_PREQUAL;
  tui: string;
  updateTUI: (tui: string) => void;
  updateForm: (form: Partial<T_Order>) => void;
}>({
  form: initForm,
  tui: '',
  updateTUI: () => {},
  updateForm: () => {},
});
const Form: React.FC = ({ children }) => {
  const [form, formSet] = useState<T_Order>(initForm);
  const [tui, tuiSet] = useState('');
  const [prequal, prequalSet] = useState<T_ADDR_PREQUAL>();
  const updateTUI = (tui: string) => {
    console.log('updateTUI', tui);
    tuiSet(tui);
  };

  useEffect(() => {
    const prequal = async () => {
      const data = await api.address.prequal(tui);
      console.log(data);
      prequalSet(data);
    };

    tui.length > 0 && prequal();
  }, [tui]);

  const updateForm = (newForm: Partial<T_Order>) => {
    formSet({ ...form, ...newForm });
  };
  return (
    <FormContext.Provider value={{ form, updateForm, tui, updateTUI, prequal }}>
      {children}
    </FormContext.Provider>
  );
};

export default Form;
