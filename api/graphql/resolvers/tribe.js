const Tribe = require("../../db/models/Tribe");

const tribeResolvers = {
  Query: {
    // Pobierz wszystkie plemiona
    tribes: async () => {
      try {
        const tribes = await Tribe.findAll();
        return tribes;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch tribes.");
      }
    },
    // Pobierz pojedyncze plemię na podstawie ID
    tribe: async (_, { id }) => {
      try {
        const tribe = await Tribe.findByPk(id);
        return tribe;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch tribe.");
      }
    },
  },
  Mutation: {
    // Dodaj nowe plemię
    createTribe: async (
      _,
      { name, tag, members, villages, points, all_points, rank }
    ) => {
      try {
        const tribe = await Tribe.create({
          name,
          tag,
          members,
          villages,
          points,
          all_points,
          rank,
        });
        return tribe;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create tribe.");
      }
    },
    // Aktualizuj istniejące plemię na podstawie ID
    updateTribe: async (
      _,
      { id, name, tag, members, villages, points, all_points, rank }
    ) => {
      try {
        const tribe = await Tribe.findByPk(id);
        if (!tribe) throw new Error("Tribe not found.");

        tribe.name = name;
        tribe.tag = tag;
        tribe.members = members;
        tribe.villages = villages;
        tribe.points = points;
        tribe.all_points = all_points;
        tribe.rank = rank;

        await tribe.save();
        return tribe;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update tribe.");
      }
    },
    // Usuń plemię na podstawie ID
    deleteTribe: async (_, { id }) => {
      try {
        const tribe = await Tribe.findByPk(id);
        if (!tribe) throw new Error("Tribe not found.");

        await tribe.destroy();
        return true;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete tribe.");
      }
    },
  },
};

module.exports = tribeResolvers;
