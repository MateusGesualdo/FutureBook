import knex from 'knex';

export default class MainDB {
    protected connection = knex({
    client: 'mysql',
    connection: {
    host: 'ec2-18-229-236-15.sa-east-1.compute.amazonaws.com',
    user: 'mateus',
    password: process.env.DATABASE_PASSWORD,
    database: 'bouman-mateus'
    }
    })
}

