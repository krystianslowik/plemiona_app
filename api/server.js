const parseReport = require("./parseReport");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = {
  Query: {
    ...require("./graphql/resolvers/player").Query,
    ...require("./graphql/resolvers/tribe").Query,
    ...require("./graphql/resolvers/user").Query,
    ...require("./graphql/resolvers/village").Query,
  },
  Mutation: {
    ...require("./graphql/resolvers/player").Mutation,
    ...require("./graphql/resolvers/tribe").Mutation,
    ...require("./graphql/resolvers/user").Mutation,
    ...require("./graphql/resolvers/village").Mutation,
  },
};
const { sequelize } = require("./config/sequelize");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let user = null;

    if (token) {
      try {
        user = jwt.verify(token, "kmic_to_debilXD");
      } catch (error) {
        console.error("Failed to verify JWT token:", error);
      }
    }

    return { user };
  },
});

app.get("/parse-report", (req, res) => {
  const world = req.query.world;
  const reportId = req.query.reportId;

  parseReport(world, reportId, res).catch((error) => {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while parsing the report" });
  });
});

server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
