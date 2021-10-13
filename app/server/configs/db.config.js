module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "12345678",
    DB: "Development_inforum",
    dialect: "postgres",
    pool: {
        max: 5, // maximum number of connection in pool
        min: 0, // minimum number of connection in pool
        acquire: 30000,
        idle: 10000
    }
};