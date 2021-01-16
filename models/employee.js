module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    monday: DataTypes.BOOLEAN,
    tuesday: DataTypes.BOOLEAN,
    wednesday: DataTypes.BOOLEAN,
    thursday: DataTypes.BOOLEAN,
    friday: DataTypes.BOOLEAN,
    saturday: DataTypes.BOOLEAN,
    sunday: DataTypes.BOOLEAN,
  });
  return Employee;
};
