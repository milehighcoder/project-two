module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    monday: DataTypes.STRING,
    tuesday: DataTypes.STRING,
    wednesday: DataTypes.STRING,
    thursday: DataTypes.STRING,
    friday: DataTypes.STRING,
    saturday: DataTypes.STRING,
    sunday: DataTypes.STRING,
  });
  return Employee;
};
