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
  tailProductId: '',
  tailVariantId: '',
  aim: '',
  existingServiceId: '',
  existingServiceProvider: '',
};

interface Store {
  form: T_Form;
  prequal?: T_ADDR_PREQUAL;
  prequaling: boolean;
  tui: string;
  updateForm: (form: Partial<T_Form>) => void;
  updateTUI: (tui: string) => void;
}
const orderStore = create<Store>((set, get) => ({
  form: initForm,
  tui: '',
  prequaling: false,
  updateForm: (newForm: Partial<T_Form>) => {
    const form = { ...get().form, ...newForm };
    console.log(form);
    set({ form });
  },
  updateTUI: async (tui: string) => {
    set({ tui, prequal: undefined });
    if (tui.length > 0) {
      set({ prequaling: true });
      const prequal = await api.address.prequal(tui);
      set({ prequal, prequaling: false });
    }
  },
}));
export default orderStore;
export const useOrderStore = orderStore[0];
