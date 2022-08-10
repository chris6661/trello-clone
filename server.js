const express = require("express"); 
const { ApolloServer, gql } = require("apollo-server-express");
const merge = require("lodash/merge"); 
const mongoose = require("mongoose"); 
const { PubSub } = require("apollo-server"); 
const { createServer } = require("http"); 
require("dotenv").config(); 

const typeDefs = gql``; 

const resolvers = {}; 

const MONGO_USER = process.env.MONGO_USER || "root"; 
const MONGO_PASS = process.env.MONGODB_PASS; 

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASS}@ds131902.mlab.com:31902/trello-hooks-graphql-clone`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("mongodb connected successfully");
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });
    const app = express();
    server.applyMiddleware({ app });
    const httpServer = createServer(app);
    
    const PORT = process.env.PORT || 4444;
    httpServer.listen({ port: PORT }, () => {
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
    }),
  });
  const app = express();
  server.applyMiddleware({ app });
  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);
  const PORT = process.env.PORT || 4444;
  httpServer.listen({ port: PORT }, () => {
    console.log(`Server is running in port ${PORT}`);
  });