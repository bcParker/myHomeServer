module.exports = (sequelize, DataTypes) => {
    const Weather = sequelize.define('weather', {
        city: {
            type: DataTypes.STRING, 
            allowNull: false, 
        },
        current_location: {
            type: DataTypes.BOOLEAN, 
            allowNull: false, 
        },
        user: {
            type: DataTypes.INTEGER,
        },
    })

    return Weather;
}