const graphql = require('graphql');
const Article = require('../models/article');


const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = graphql;


//
// const articles = [
//   {"id": "1001010343", "title": "First Article", "body": "body of first article"},
//   {"id": "1001010323", "title": "second Article", "body": "body of second article"},
//   {"id": "1001010333", "title": "third Article", "body": "body of third article"},
// ]
const ArticleType = new GraphQLObjectType({
  name: 'Article',
  description: 'articles used in this blog',
  fields:{
    id: { type:GraphQLID},
    title: {type:GraphQLString},
    body: {type: GraphQLString}
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'the root query for all entities',
  fields: {
    //query for articles
    article: {
      type: new GraphQLList(ArticleType),
      resolve(parentValue, args) {
        return new Promise((resolve, reject)=>{
          Article.find({}, function(err, response){
            if(err) return next(err);
            return resolve(response);
          })
        })
      }
    }
}
});

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addArticle: {
      type: ArticleType,
      args: {
        title: {type: GraphQLString},
        body: {type: GraphQLString}
      },
      resolve(parentValue,args){
        return new Promise((resolve, reject)=> {
          const article = new Article(args);
          return resolve(article.save());
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query : RootQuery,
  mutation: Mutation
})
