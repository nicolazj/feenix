export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];


export interface T_Form {
  subscriberName: string;
  customerReference: string;
  address: string;
  demarc: string;
  siteAccessInformation: string;
  siteContactName: string;
  siteContactNumber: string;
  siteContactEmail: string;
  targetDate: string;
  orderContactName: string;
  orderContactNumber: string;
  orderContactEmail: string;

  selectedProduct: string;
  aim:string;
  existingServiceId:string,
  existingServiceProvider:string
}

export interface T_Order_Payload {
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

export interface T_ADDR_PREQUAL {
  address: Address;
  technologies: Technology[];
  availableQuickOrderProducts: AvailableQuickOrderProduct[];
  availableComponentProducts: AvailableComponentProduct[];
  vendorServices: VendorService[];
  existingServices: any[];
  circuitTerminations: CircuitTermination[];
}

interface Address {
  _id: string;
}

interface AvailableComponentProduct {
  product: Product;
  variants: Variant[];
}

interface Product {
  _id: string;
  name: string;
  productCode: string;
  productClass: string;
  vendor: ProductVendor;
  isSold: boolean;
  technology?: string;
}

interface ProductVendor {
  _id: string;
  name: string;
}

interface Variant {
  _id: string;
  label: string;
  name: string;
}

interface AvailableQuickOrderProduct {
  soldProduct: Product;
  tailProduct: Product;
  tailVariants: Variant[];
}

interface CircuitTermination {
  technology: string;
  vendor: ProductVendor;
  vendorCircuitId: string;
  circuitStatus: string;
  activeServiceCount: number;
}

interface Technology {
  availability: Availability;
  installStatus: Availability;
  serviceStatus: Availability;
  vendors: VendorElement[];
  technology: string;
}

interface Availability {
  code?: string;
}

interface VendorElement {
  vendor: VendorVendor;
  technology: string;
  availability: Availability;
  installStatus: Availability;
  serviceStatus: Availability;
  isConsentRequired?: boolean;
  isBuildRequired?: boolean;
  isStandardInstall?: boolean;
  isMDU?: boolean;
  attributes: Attribute[];
}

export interface Attribute {
  name: string;
  value: string;
}

export interface VendorVendor {
  _id: string;
  name: string;
  number: string;
}

export interface VendorService {
  vendor: ProductVendor;
  technology: string;
  hasInflightOrder: boolean;
  name: string;
  id: string;
  ontId: string;
  isOwnerByCustomer: boolean;
}
