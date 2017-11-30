var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];


if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  if (env === 'test') config.logging = false;
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.User = require('./user')(sequelize, Sequelize);
db.Location = require('./location')(sequelize, Sequelize);
db.Profile = require('./profile')(sequelize, Sequelize);
db.View = require('./view')(sequelize, Sequelize);


// Relations
db.Profile.belongsTo(db.User);
db.User.hasOne(db.Profile);

db.Location.hasMany(db.Profile);
db.Profile.belongsTo(db.Location);

db.User.belongsToMany(db.User, {
  through: db.View,
  as: 'Views',
  foreignKey: 'ViewerId'
});

db.User.belongsToMany(db.User, {
  through: db.View,
  as: 'Viewed',
  foreignKey: 'ViewedId'
});


module.exports = db;
