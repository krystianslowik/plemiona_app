const Sequelize = require("sequelize");

// Inicjalizacja połączenia z bazą danych
const sequelize = new Sequelize(
  "plemiona_app",
  "plemiona_app_user",
  "plemiona_app_password",
  {
    host: "127.0.0.1",
    dialect: "mysql",
  }
);

// Importowanie modeli
const UserModel = require("../db/models/User");
const PlayerModel = require("../db/models/Player");
const TribeModel = require("../db/models/Tribe");
const VillageModel = require("../db/models/Village");

// Inicjalizacja modeli
const User = UserModel(sequelize, Sequelize);
const Player = PlayerModel(sequelize, Sequelize);
const Tribe = TribeModel(sequelize, Sequelize);
const Village = VillageModel(sequelize, Sequelize);

// Definicja relacji między modelami
User.hasOne(Player, { foreignKey: "userId", as: "player" });
Player.belongsTo(User, { foreignKey: "userId", as: "user" });

Tribe.hasMany(Player, { foreignKey: "tribeId", as: "players" });
Player.belongsTo(Tribe, { foreignKey: "tribeId", as: "tribe" });

User.hasOne(Tribe, { foreignKey: "userId", as: "tribe" });
Tribe.belongsTo(User, { foreignKey: "userId", as: "user" });

User.hasMany(Village, { foreignKey: "userId", as: "villages" });
Village.belongsTo(User, { foreignKey: "userId", as: "user" });

// Synchronizacja modeli z bazą danych
sequelize.sync();

// Eksportowanie instancji Sequelize i modeli
module.exports = { sequelize, User, Player, Tribe, Village };
