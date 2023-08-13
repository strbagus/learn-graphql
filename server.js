const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' },
]

const books = [
  { id: 1, authorId: 1, name: 'Harry Potter and the Chamber of Secrets' },
  { id: 2, authorId: 1, name: 'Harry Potter and the Prisoner of Azkaban' },
  { id: 3, authorId: 1, name: 'Harry Potter and the Goblet of Fire' },
  { id: 4, authorId: 2, name: 'The Fellowship of the Ring' },
  { id: 5, authorId: 2, name: 'The Two Towers' },
  { id: 6, authorId: 2, name: 'The Return of the King' },
  { id: 7, authorId: 3, name: 'The Way of Shadows' },
  { id: 8, authorId: 3, name: 'Beyond the Shadows' },
]

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents an author of a book',
  fields: () =>  ({
    id: { type: GraphQLNonNull(GraphQLInt)},
    name: { type: GraphQLNonNull(GraphQLString)},
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => {
        return books.filter(book => book.authorId === author.id)
      }
    }
  })
})
const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () =>  ({
    id: { type: GraphQLNonNull(GraphQLInt)},
    name: { type: GraphQLNonNull(GraphQLString)},
    authorId: { type: GraphQLNonNull(GraphQLInt)},
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find(author => author.id === book.authorId)
      }
    }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (_parent, args) => books.find(book => book.id === args.id)
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (_parent, args) => books.find(book => book.id === args.id)
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors
    }
  })
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a Book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an Author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_parent, args) => {
        const author = { id: authors.length + 1, name: args.name }
        authors.push(author)
        return author 
      }
    },
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}))
app.listen(5000., () => console.log('server running'))
