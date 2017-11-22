var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];


if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.User = require('./user')(sequelize, Sequelize);
// db.calendars = require('./calendar.js')(sequelize, Sequelize);


//Relations
// db.calendars.belongsTo(db.users, { foreignKey: 'userId', as: 'user'});
// db.users.hasMany(db.calendars, { foreignKey: 'userId', as: 'calendars' });


module.exports = db;
