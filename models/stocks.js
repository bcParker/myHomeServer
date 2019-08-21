module.exports = (sequelize, DataTypes) => {
    const Stocks = sequelize.define('stocks', {

        symbol: {
            type: DataTypes.STRING,
            allow_null: false,
        },
        user: {
            type: DataTypes.INTEGER,
            allow_null: true,
        }
        })

    return Stocks;
}