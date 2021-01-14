module.exports = (sequelize, DataTypes) => {
    const Manager = sequelize.define('Manager', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
    });
    return Manager;
};
