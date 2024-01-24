export const BASE_URL =
  'https://efskorntxa.execute-api.ap-south-1.amazonaws.com/Dev'

export default {
  partnerSingUp: BASE_URL + '/api/partner',
  LoginApi: BASE_URL + '/api/login',
  addLead: BASE_URL + '/api/lead_details',
  assetApi: BASE_URL + '/api/leads_asset',
  lookupApi: BASE_URL + '/api/lookup',
  password: BASE_URL + "/api/partner/password",
  setTarget: BASE_URL + "/api/partner/target",
}
