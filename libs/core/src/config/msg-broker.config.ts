import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IMSGBrokerConfig {
  MQTT_BROKER_URL: string;
  MQTT_BROKER_PORT: string;
  MQTT_BROKER_USERNAME: string;
  MQTT_BROKER_PASSWORD: string;
}

export default registerAs('msgBroker', () => {
  // Our environment variables
  const values: IMSGBrokerConfig = {
    MQTT_BROKER_URL: process.env.MQTT_BROKER_URL,
    MQTT_BROKER_PORT: process.env.MQTT_BROKER_PORT,
    MQTT_BROKER_USERNAME: process.env.MQTT_BROKER_USERNAME,
    MQTT_BROKER_PASSWORD: process.env.MQTT_BROKER_PASSWORD,
  };

  // Joi validations
  const schema = Joi.object({
    MQTT_BROKER_URL: Joi.string().required(),
    MQTT_BROKER_PORT: Joi.string().required(),
    MQTT_BROKER_USERNAME: Joi.string().required(),
    MQTT_BROKER_PASSWORD: Joi.string().required(),
  });

  // Validates our values using the schema.
  const { error } = schema.validate(values, { abortEarly: false });

  if (error) {
    throw new Error(`Config validation error: ${error.message} in .env file`);
  }

  return values;
});
