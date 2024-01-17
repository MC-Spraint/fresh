import * as Joi from "joi";

export const configValidations = Joi.object().keys({
  PORT: Joi.number().default(3000),
  THROTTLE_LIMIT: Joi.number().default(60),
  THROTTLE_TTL: Joi.number().default(60),

  DATABASE_URI: Joi.string().required(),

  SENDER_ID: Joi.string().required(),
  SENDER_PASSWORD: Joi.string().required(),
  EMAIL_SECRET: Joi.string().required(),

  ONESIGNAL_USER_API_KEY: Joi.string().required(),
  ONESIGNAL_USER_APP_ID: Joi.string().required(),

  ONESIGNAL_DELIVERY_PARTNER_API_KEY: Joi.string().required(),
  ONESIGNAL_DELIVERY_PARTNER_APP_ID: Joi.string().required(),

  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
  REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
  PUBLIC_KEY: Joi.string().required(),
  PRIVATE_KEY: Joi.string().required(),

  TWILIO_SENDER_NUMBER: Joi.string().required(),
  TWILIO_ACCOUNT_SID: Joi.string().required(),
  TWILIO_AUTH_TOKEN: Joi.string().required(),

  REDIS_HOST: Joi.string().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_PORT: Joi.string().required(),

  STRIPE_SECRET: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET: Joi.string().required(),
});
