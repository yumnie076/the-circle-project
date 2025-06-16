export interface IEnvironment {
    production: boolean;

    ROOT_DOMAIN_URL: string;
    dataApiUrl: string;

    MONGO_DB_CONNECTION_STRING: string;

    // Hier kun je meer environment
    // variabelen zetten als dat nodig is

    /** Hostname van de PeerJS-signaling server */
    PEER_SERVER_HOST: string;

    /** Poort van de PeerJS-signaling server */
    PEER_SERVER_PORT: number;
}
