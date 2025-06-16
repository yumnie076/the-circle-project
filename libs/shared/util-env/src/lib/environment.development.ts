import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    dataApiUrl: 'http://localhost:3000/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb://localhost:27017/shareameal',

  PEER_SERVER_HOST: '145.49.45.89',
    PEER_SERVER_PORT: 9000
};
