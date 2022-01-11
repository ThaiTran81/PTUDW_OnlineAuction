import fn from 'knex';

export const connectionInfo = {
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'auction_online_db'
};

const knex = fn({
    client: 'mysql2',
    connection: connectionInfo,
    pool: { min: 0, max: 10 }
});

export default knex;