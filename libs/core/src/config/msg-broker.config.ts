import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IMSGBrokerConfig {
  RabbitMQ_URL: string;
  RabbitMQ_USERNAME: string;
  RabbitMQ_PASSWORD: string;
}

export default registerAs('msgBroker', () => {
  // Our environment variables
  const values: IMSGBrokerConfig = {
    RabbitMQ_URL: process.env.RabbitMQ_URL,
    RabbitMQ_USERNAME: process.env.RabbitMQ_USERNAME,
    RabbitMQ_PASSWORD: process.env.RabbitMQ_PASSWORD,
  };

  // Joi validations
  const schema = Joi.object({
    RabbitMQ_URL: Joi.string().required(),
    RabbitMQ_USERNAME: Joi.string().required(),
    RabbitMQ_PASSWORD: Joi.string().required(),
  });

  // Validates our values using the schema.
  const { error } = schema.validate(values, { abortEarly: false });

  if (error) {
    throw new Error(`Config validation error: ${error.message} in .env file`);
  }

  return values;
});
