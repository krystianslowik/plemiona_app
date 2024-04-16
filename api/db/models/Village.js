const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Village = sequelize.define(
    "Village",
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
      x: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      y: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      player: {
        type: DataTypes.INTEGER,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rank: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "villages",
    }
  );

  return Village;
};
