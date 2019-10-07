import { create } from 'zustand';

import api from '../api';
import { T_ADDR_PREQUAL, T_Form } from '../types';

const initForm: T_Form = {
  subscriberName: 'subscriberName',
  address: '10 tenter',
  customerReference: 'customerReference',
  demarc: 'demarc',
  siteAccessInformation: 'siteAccessInformation',
  siteContactName: 'siteContactName',
  siteContactNumber: 'siteContactNumber',
  siteContactEmail: 'siteContactEmail',
  targetDate: '11/11/2020',
  orderContactName: 'orderContactName',
  orderContactNumber: 'orderContactNumber',
  orderContactEmail: 'orderContactEmail',
  selectedProduct: '',
  aim: '',
  existingServiceId: '',
  existingServiceProvider: '',
};

interface Store {
  form: T_Form;
  prequal?: T_ADDR_PREQUAL;
  tui: string;
  updateForm: (form: Partial<T_Form>) => void;
  updateTUI: (tui: string) => void;
}
const orderStore = create<Store>((set, get) => ({
  form: initForm,
  tui: '',
  updateForm: (form: Partial<T_Form>) => {
    set({ form: { ...get().form, ...form } });
  },
  updateTUI: async (tui: string) => {
    set({ tui });
    if (tui.length > 0) {
      const prequal = await api.address.prequal(tui);
      set({ prequal });
    }
  },
}));
export default orderStore;
export const  useOrderStore = orderStore[0]