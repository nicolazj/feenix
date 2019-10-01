export interface T_Order {
  addressId: string;
  soldProductId: string;
  tailProductId: string;
  aim: string;
  subscriberName: string;
  isBusiness: string;
  customerReference: string;
  tailVariantId: string;
  demarc: string;
  siteAccessInformation: string;
  siteContactName: string;
  siteContactNumber: string;
  siteContactEmail: string;
  targetDate: string;
  orderContactName: string;
  orderContactNumber: string;
  orderContactEmail: string;
  existingServiceId: string;
  existingServiceProvider: string;
}

export interface T_ADDR_LOOKUP {
  label: string;
  tui: string;
}
