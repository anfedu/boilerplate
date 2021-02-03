const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const Post = require("./models/Post");
const express = require("express");

require("dotenv").config();

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo db connected");
    return server.listen({ port: process.env.PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
