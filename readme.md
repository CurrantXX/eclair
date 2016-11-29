Node.JS web development stack
====

## Structure
```
.
├── babel.index.js   // entry for babel
├── cache.js         // inits cache(redis)
├── config.js        // configuration
├── database.js      // inits database(MySQL and MongoDB)
├── entity           // model or entity layer
│   ├── game.js
│   └── user.js
├── handler          // web routing layer
│   ├── game.js
│   └── user.js
├── index.js         // entry
├── log              // saves logging files
│   └── app.log
├── logger.js        // inits logger
├── middleware       // middlewares
│   ├── base.js
│   └── mysql-transaction.js
├── npm-debug.log
├── package.json
├── readme.md
├── route.js         // routing entry
├── service          // operation layer
│   ├── game.js
│   └── user.js
└── test             // saves testings
    ├── test.js
    └── user.js
```

![structure](https://github.com/CurrantXX/eclair/raw/master/structure.png)

## Usage
### Run an application
```bash
npm start
```

### Run a testing
```bash
npm test
```

## Component
### Web 
- [x] [Koa@2](https://github.com/koajs/koa)

### Database and Cache
- [x] MySQL: [Sequelize](sequelizejs.com)
- [x] MongoDB: [Mongoose](http://mongoosejs.com)
- [x] Redis: [Node Redis](http://redis.js.org)

### Message Queue
- [ ] [node-ampq](https://github.com/postwait/node-amqp) using [RabbitMQ](https://www.rabbitmq.com/documentation.html) as message queue broker
- [ ] [kue](https://github.com/Automattic/kue) using **Redis** as message queue broker

### Logging
- [x] [winston](https://github.com/winstonjs/winston)

### Testing
- [x] Test runner: [Mocha](https://github.com/mochajs/mocha)
- [x] Assertion library: [Chai](https://github.com/chaijs/chai)
- [ ] Test spies, stubs and mocks [Sinon](https://github.com/sinonjs/sinon)
- [ ] Code coverage: [istanbul](https://github.com/gotwarlost/istanbul)
