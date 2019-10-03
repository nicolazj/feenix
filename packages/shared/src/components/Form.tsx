import React, { createContext, useEffect, useState } from 'react';

import api from '../api';
import { T_ADDR_PREQUAL, T_Form } from '../types';

const initForm: T_Form = {
  subscriberName: 'subscriberName',
  address: '10 tenter',
  customerReference: 'customerReference',
  termLocation: 'termLocation',
  siteAccessInformation: 'siteAccessInformation',
  siteContactName: 'siteContactName',
  siteContactNumber: 'siteContactNumber',
  siteContactEmail: 'siteContactEmail',
  targetDate: '11/11/2020',
  orderContactName: 'orderContactName',
  orderContactNumber: 'orderContactNumber',
  orderContactEmail: 'orderContactEmail',
  selectedProducts: [],
  aim:''
};
export const FormContext = createContext<{
  form: T_Form;
  prequal?: T_ADDR_PREQUAL;
  tui: string;
  updateTUI: (tui: string) => void;
  updateForm: (form: Partial<T_Form>) => void;
}>({
  form: initForm,
  tui: '',
  updateTUI: () => {},
  updateForm: () => {},
});
const Form: React.FC = ({ children }) => {
  const [form, formSet] = useState<T_Form>(initForm);
  const [tui, tuiSet] = useState('');
  const [prequal, prequalSet] = useState<T_ADDR_PREQUAL>();
  const updateTUI = (tui: string) => {
    tuiSet(tui);
  };
  console.log(form);
  useEffect(() => {
    const prequal = async () => {
      const data = await api.address.prequal(tui);
      prequalSet(data);
    };

    tui.length > 0 && prequal();
  }, [tui]);

  const updateForm = (newForm: Partial<T_Form>) => {
    formSet({ ...form, ...newForm });
  };
  return (
    <FormContext.Provider value={{ form, updateForm, tui, updateTUI, prequal }}>
      {children}
    </FormContext.Provider>
  );
};

export default Form;
