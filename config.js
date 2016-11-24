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
      host: "127.0.0.1",
      port: 3306,
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  },
  mongo: {
    uri: "mongodb://127.0.0.1:27017/24haowan",
    options: {
      db: {},
      server: {
        poolSize: 5
      }
    }
  },
  redis: {
    host: "127.0.0.1",
    port: 6379,
    // path: null,
    // url: null,
    // db: null,
    // password: null
  }
};
