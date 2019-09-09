const Sequelize = require('sequelize');

const sequelize = new Sequelize('myHome', 'postgres', 'Chivas123.', {
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

module.exports = sequelize;