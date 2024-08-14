import { IDatabaseConfig } from './databse.config';
import { IMSGBrokerConfig } from './msg-broker.config';
import { IREDISConfig } from './redis.config';

/**
 * for type safety this is a map of configurations of the app
 * @type IAppConfig
 */
export interface IAppConfig {
  database: IDatabaseConfig;
  msgBroker: IMSGBrokerConfig;
  redis: IREDISConfig;
  // Add more configurations as needed
}
