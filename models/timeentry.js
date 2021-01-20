module.exports = (sequelize, DataTypes) => {
  const TimeEntry = sequelize.define("TimeEntry", {
    start_timestamp: DataTypes.DATE,
    end_timestamp: DataTypes.DATE,
  });

  return TimeEntry;
};