const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Create database tables and models */
db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.phones = require("./phone.model.js")(sequelize, Sequelize);
//db.exports.Contact.hasMany(db.exports.Phone);
//db.exports.Phone.belongsTo(db.exports.Contact);

module.exports = db;

/*db.sequelize.sync({ force: true }).then(() => {
  const c1 = Contact.create({
      name: 'Matt'
  }).then(c => {
      const n1 = Phone.create({
          type: 'office',
          number: '123456',
          contactId: c.id
      });  
      return n1;
  });
  const c2 = Contact.create({
      name: 'Milo'
  }).then(c => {
      const n2 = Phone.create({
          type: 'mobile',
          number: '789012',
          contactId: c.id
      });
      return n2;
  });
  return Promise.all([c1, c2]);
})*/