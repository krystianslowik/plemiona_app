const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  const Player = sequelize.define(
    "Player",
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
      ally: {
        type: DataTypes.INTEGER,
      },
      villages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      tableName: "players",
    }
  );

  return Player;
};
