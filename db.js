const Sequelize = require('sequelize');

const sequelize = new Sequelize('myHome', 'postgres', 'ackpostgres', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('Connection to myHome database successful (و ˃̵ᴗ˂̵)و');
	},
	function(err) {
		console.log(err);
	}
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./models/user")(db.sequelize, Sequelize)
db.Stocks = require("./models/stocks")(db.sequelize, Sequelize)
db.Weather = require("./models/weather")(db.sequelize, Sequelize)

db.User.hasMany(db.Weather);
db.User.hasMany(db.Stocks);
db.Weather.belongsTo(db.User);
db.Stocks.belongsTo(db.User);

console.log(db.User)
module.exports = db;