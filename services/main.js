const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const productSv = require('./productSv/productSv')

let findAll = productSv.findAll();
let findById = productSv.findById();
let saveNewProd = productSv.saveNewProd();
let deleteAProd = productSv.deleteAProd();
let deleteAllProd = productSv.deleteAllProd();
let updateProdById = productSv.updateProdById();

const schema = buildSchema(`
  type Products {
    id: ID!,
    title: String,
    price: Int,
    description: String,
    photo: String,
    category: String    
  }
  input ProductsInput {
    title: String,
    price: Int,
    description: String,
    photo: String,
    category: String
  }
  type Query {
    findById(id: ID!): Products,
    findAll: [Products],
  }
  type Mutation {
    saveNewProd(datos: ProductsInput): Products
    updateProdById(id: ID!, datos: ProductsInput): Products,
    deleteAProd(id: ID!): Products,
    deleteAllProd: Products,
  }
`);


const app = express()

app.use(express.json())


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
        findAll,
        findById,
        saveNewProd,
        deleteAProd,
        deleteAllProd,
        updateProdById
    },
    graphiql: true,
 }));
 

module.exports = app;