import 'dotenv/config';

const env = process.env;

export const environments = {
  port: Number(env.PORT || 3000),
  mongoUri: env.MONGODB_URI,
  proxyEnabled: env.PROXY_ENABLED === 'true',
  jwtSecret: env.JWT_SECRET,
  jwtExpiration: env.JWT_EXPIRATION,
};
