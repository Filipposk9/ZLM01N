import AzureAuth from 'react-native-azure-auth';

export const GOODS_MOVEMENT_CODE = {
  GOODS_ISSUE: '03',
  TRANSFER_POSTING: '04',
};

export const MOVEMENT_TYPE = {
  GOODS_ISSUE: '261',
  TRANSFER_POSTING: '311',
};

export const PRODUCTION_ORDER = {
  BLANK: '',
};

export const STORAGE_LOCATION = {
  BUILDING_B_YARD: '2200',
  BUILDING_C_YARD: '3200',
  BUILDING_C_SCRAP: '3209',
};

export const AZURE_AUTH = new AzureAuth({
  clientId: 'b7c14ee8-9bc0-4e9e-b32e-3f5a5e2eaeb3',
  tenant: '1c32b97c-c0df-4764-83e5-b85512702173',
  redirectUri: 'com.zlm01n://com.zlm01n/android/callback',
});
