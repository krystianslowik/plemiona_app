const Player = require("../../db/models/Player");

const playerResolvers = {
  Query: {
    // Pobierz wszystkich graczy
    players: async () => {
      try {
        const players = await Player.findAll();
        return players;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch players.");
      }
    },
    // Pobierz pojedynczego gracza na podstawie ID
    player: async (_, { id }) => {
      try {
        const player = await Player.findByPk(id);
        return player;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch player.");
      }
    },
  },
  Mutation: {
    // Dodaj nowego gracza
    createPlayer: async (_, { name, ally, villages, points, rank }) => {
      try {
        const player = await Player.create({
          name,
          ally,
          villages,
          points,
          rank,
        });
        return player;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create player.");
      }
    },
    // Aktualizuj istniejącego gracza na podstawie ID
    updatePlayer: async (_, { id, name, ally, villages, points, rank }) => {
      try {
        const player = await Player.findByPk(id);
        if (!player) throw new Error("Player not found.");

        player.name = name;
        player.ally = ally;
        player.villages = villages;
        player.points = points;
        player.rank = rank;

        await player.save();
        return player;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update player.");
      }
    },
    // Usuń gracza na podstawie ID
    deletePlayer: async (_, { id }) => {
      try {
        const player = await Player.findByPk(id);
        if (!player) throw new Error("Player not found.");

        await player.destroy();
        return true;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete player.");
      }
    },
  },
};

module.exports = playerResolvers;
