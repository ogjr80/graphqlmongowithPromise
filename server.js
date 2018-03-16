const express = require('express');
const graphQLServer = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/blogdb', function(){
  console.log('database connection established successfully');
});



const app = express();


app.use('/graphql', graphQLServer({
  graphiql: true,
  schema
}));


app.listen(3000, function(){
  console.log('server running on port 3000')
});
