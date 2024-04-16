const Village = require("../../db/models/Village");

const villageResolvers = {
  Query: {
    // Pobierz wszystkie wioski
    villages: async () => {
      try {
        const villages = await Village.findAll();
        return villages;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch villages.");
      }
    },
    // Pobierz pojedynczą wioskę na podstawie ID
    village: async (_, { id }) => {
      try {
        const village = await Village.findByPk(id);
        return village;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch village.");
      }
    },
  },
  Mutation: {
    // Dodaj nową wioskę
    createVillage: async (_, { name, x, y, player, points, rank }) => {
      try {
        const village = await Village.create({
          name,
          x,
          y,
          player,
          points,
          rank,
        });
        return village;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create village.");
      }
    },
    // Aktualizuj istniejącą wioskę na podstawie ID
    updateVillage: async (_, { id, name, x, y, player, points, rank }) => {
      try {
        const village = await Village.findByPk(id);
        if (!village) throw new Error("Village not found.");

        village.name = name;
        village.x = x;
        village.y = y;
        village.player = player;
        village.points = points;
        village.rank = rank;

        await village.save();
        return village;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update village.");
      }
    },
    // Usuń wioskę na podstawie ID
    deleteVillage: async (_, { id }) => {
      try {
        const village = await Village.findByPk(id);
        if (!village) throw new Error("Village not found.");

        await village.destroy();
        return true;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete village.");
      }
    },
  },
};

module.exports = villageResolvers;
