const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const {Schema} = require('./graphql/schema')
const app = express()
const port = 3000


app.use(
    '/graphql',
    graphqlHTTP({
      schema: Schema,
      graphiql: true,
    }),
  );
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})