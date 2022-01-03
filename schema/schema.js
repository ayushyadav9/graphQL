const graphql = require('graphql')
const {GraphQLObjectType, GraphQLSchema, GraphQLNonNull} = graphql
const {Book, Author} = require('../models/schema')
const _ = require('lodash')


const BookType = new GraphQLObjectType({
    name:'Book',
    fields: ()=>({
        id:{type: graphql.GraphQLString},
        name:{type: graphql.GraphQLString},
        genre:{type: graphql.GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args){
                return Author.findById(parent.authorId)
            }
        }
    })
}) 

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: ()=>({
        id:{type: graphql.GraphQLString},
        name:{type: graphql.GraphQLString},
        age:{type: graphql.GraphQLInt},
        books:{
            type: new graphql.GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({authorId: parent.id})
            }
        }
    })
}) 


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{id:{type:graphql.GraphQLID}},
            resolve(parent,args){
                return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: graphql.GraphQLID}},
            resolve(parent,args){
                 return Author.findById(args.id)
            }
        },
        books:{
            type: new graphql.GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({})
            }
        },
        authors:{
            type: new graphql.GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({})
            }
        }
    }
    
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type: new GraphQLNonNull(graphql.GraphQLString)},
                age: {type: new GraphQLNonNull(graphql.GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name: {type: new GraphQLNonNull(graphql.GraphQLString)},
                genre: {type: new GraphQLNonNull(graphql.GraphQLString)},
                authorId: {type: new GraphQLNonNull(graphql.GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
