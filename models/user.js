module.exports = (sequelize, DataTypes) => {
	return sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			uniqe: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		avatar: {
			type: DataTypes.STRING,
			allowNull: true
		}
	})
}
