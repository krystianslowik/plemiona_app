const { sequelize } = require("../../config/sequelize");
const User = require("../../db/models/User")(sequelize);
const { generateAccessToken } = require("../../../src/utils/token");

const userResolvers = {
  Query: {
    // Pobierz wszystkich użytkowników
    users: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch users.");
      }
    },
    // Pobierz pojedynczego użytkownika na podstawie ID
    user: async (_, { id }) => {
      try {
        const user = await User.findByPk(id);
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user.");
      }
    },
  },
  Mutation: {
    // Dodaj nowego użytkownika
    createUser: async (_, { input }) => {
      try {
        const { name, username, password, roles, settings } = input;
        const user = await User.create({
          name,
          username,
          password,
          roles,
          settings,
        });
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create user.");
      }
    },
    // Aktualizuj istniejącego użytkownika na podstawie ID
    updateUser: async (
      _,
      { id, name, username, password, roles, settings }
    ) => {
      try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found.");

        user.name = name;
        user.username = username;
        user.password = password;
        user.roles = roles;
        user.settings = settings;

        await user.save();
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update user.");
      }
    },
    // Usuń użytkownika na podstawie ID
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) throw new Error("User not found.");

        await user.destroy();
        return true;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete user.");
      }
    },
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
          throw new Error("Invalid username or password");
        }

        // Check password validity XDDDDD
        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
          throw new Error("Invalid username or password");
        }

        // Generate auth token based on user data
        const token = generateAccessToken({
          id: user.id,
          username: user.username,
          role: user.role,
        });

        return {
          id: user.id,
          username: user.username,
          token,
        };
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
  },
};

module.exports = userResolvers;
