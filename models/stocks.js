module.exports = (sequelize, DataTypes) => {
    const Stocks = sequelize.define('stocks', {

        symbol: {
            type: DataTypes.STRING,
            allow_null: false,
        },
        })

    return Stocks;
}