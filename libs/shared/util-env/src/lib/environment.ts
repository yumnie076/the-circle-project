import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'dummy',
    dataApiUrl: 'dummy',

    MONGO_DB_CONNECTION_STRING: 'dummy',

    PEER_SERVER_HOST: 'localhost',
    PEER_SERVER_PORT: 9000
};
