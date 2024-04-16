const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Tribe = sequelize.define(
    "Tribe",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      members: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      villages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      all_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rank: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "tribes",
    }
  );

  return Tribe;
};
