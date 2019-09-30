export interface T_SIGN_IN{
    username:string,
    password:string
}

export interface T_AUTH_RESP {
    sessiontoken: string;
    profileId: string;
    status: string;
  }
  
  export interface T_Profile {
    firstName: string;
    lastName: string;
    displayName: string;
    profileId: string;
    email: string;
    status: string;
    accountNumber: string;
    parentalControlEnabled: boolean;
    parentalPin: string;
    parentalRatingLevel: string;
    blockAdultContent: boolean;
    receiveMarketingEmail: boolean;
    associated: boolean;
    type: string;
  }
  
  export interface T_Device {
    product: string;
    deviceId: string;
    profileId: string;
    alias: string;
    dateRegistered: Date;
    enabled: boolean;
    description: string;
  }
  export interface T_Occurrence {
    accountNumber: string;
    serialNumber: string;
    occurrenceNumber: string;
    nickName: string;
    occurrenceType: string;
    portType: string;
    itemNumber: string;
    entitlements: {
      code: string;
      name: string;
    }[];
  }
  
  export interface T_SKU {
    sku: string;
    inboundIcomsCodes: string[];
    provisioningCodes: string[];
    upgradePathSkus: string[];
    perOccurrenceCodes: string[];
    perNonDigiCodes: string[];
    accountCodes: string[];
    feeCodes: string[];
    removeCodes: string[];
    enableChannels: string[];
    singleOccurrenceCodes: string[];
    singleRemoveCodes: string[];
    trialCodes: string[];
    groupId: null | string;
    articleId: null | string;
    modified: number;
    digi: boolean;
    decoder: boolean;
    deprecated: boolean;
  }
  
  export interface T_Marketing_Product {
    sku: string;
    name: string;
    composite: boolean;
    allowMultipleQty: boolean;
    rankInCategory: number;
    contentType: string;
    sortWeight?: string;
    groupId: string;
    articleId: string;
    content?: string;
    hideTerms: boolean;
    modified: number;
    editProductURL?: string;
    imageUrl?: string;
    link?: string;
    description?: string;
    terms?: string;
    subheading?: string;
  }
  