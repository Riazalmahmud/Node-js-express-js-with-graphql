const {
    GraphQLSchema,
  } = require('graphql');
const {
    RootQueryType,
    RootMutationType
  } = require('./types');
const Schema= new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

module.exports = {
    Schema
}