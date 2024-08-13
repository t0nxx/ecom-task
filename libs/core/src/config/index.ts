import { IDatabaseConfig } from './databse.config';
import { IMSGBrokerConfig } from './msg-broker.config';

/**
 * for type safety this is a map of configurations of the app
 * @type IAppConfig
 */
export interface IAppConfig {
  database: IDatabaseConfig;
  msgBroker: IMSGBrokerConfig;
  // Add more configurations as needed
}
