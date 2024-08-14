import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IREDISConfig {
  REDIS_HOST: string;
  REDIS_PORT: number;
}

export default registerAs('redis', () => {
  // Our environment variables
  const values: IREDISConfig = {
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: parseInt(process.env.REDIS_PORT, 10),
  };

  // Joi validations
  const schema = Joi.object({
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
  });

  // Validates our values using the schema.
  const { error } = schema.validate(values, { abortEarly: false });

  if (error) {
    throw new Error(`Config validation error: ${error.message} in .env file`);
  }

  return values;
});
