module.exports = {
  app: {
    debug: true,
    secret: "asAS2UBf_124(**)fs12455"
  },
  db: {
    database: "24haowan",
    username: "root",
    password: "root",
    options: {
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  },
  mongo: {
    uri: "mongodb://localhost:27017/24haowan",
    options: {
      db: {},
      server: {
        poolSize: 5
      }
    }
  },
  redis: {}
};
