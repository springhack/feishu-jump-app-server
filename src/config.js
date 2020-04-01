const GIZETA_KV_URL = `https://kv.gizeta.me/${process.env.KV_SCOPE}`;
const USER_INFO_URL = 'https://open.feishu.cn/open-apis/user/v4/info';
const TOKEN_VALIDATE_URL = 'https://open.feishu.cn/open-apis/mina/v2/tokenLoginValidate';
const ACCESS_TOKEN_URL = 'https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal/';

const app_id = process.env.APP_ID;
const app_secret = process.env.APP_SECRET;

module.exports = {
  app_id,
  app_secret,
  GIZETA_KV_URL,
  USER_INFO_URL,
  ACCESS_TOKEN_URL,
  TOKEN_VALIDATE_URL
};
