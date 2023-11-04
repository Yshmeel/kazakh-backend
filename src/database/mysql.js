const init = () => {
    const {
        DB_HOST,
        DB_PORT = 3306,
        DB_USERNAME,
        DB_PASSWORD,
        DB_NAME
    } = process.env;

    return require('knex')({
        client: 'mysql2',
        connection: {
            host : DB_HOST,
            port : DB_PORT,
            user : DB_USERNAME,
            password : DB_PASSWORD,
            database : DB_NAME
        }
    });;
};


const mysql = {
    init
};

export default mysql;
