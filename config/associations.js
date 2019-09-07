const sequelize = require('../models').sequelize;
const User = sequelize.model('user');
const Weather = sequelize.model('weather');
const Stocks = sequelize.model('stocks');

User.hasMany(Weather, Stocks);
Weather.belongsTo(User);
Stocks.belongsTo(User);

sequelize.sync();