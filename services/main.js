const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const productSv = require('./productSv/productSv');

function allProds() {
    const allProds = productSv.findAll();
    return allProds
}

function oneProd(id) {
    const oneProds = productSv.findById(id);
    return oneProds
}

function saveProd(newProd) {
    console.log(newProd.datos)
    const saveProd = productSv.saveNewProd(newProd.datos);
    return saveProd
}

function updateProd(allObj) {
    const saveProd = productSv.updateProdById(allObj._id, allObj.datos);
    return saveProd
}

function deleteProd(id) {
    const deleteProd = productSv.deleteAProd(id);
    return deleteProd
}

function deleteAll() {
    const deleteAll = productSv.deleteAllProd();
    return deleteAll
}

const schema = buildSchema(`
  type Products {
    _id: ID!,
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
    allProds: [Products],
    oneProd(_id: ID!): Products,
  }
  type Mutation {
    saveProd(datos: ProductsInput): Products,
    updateProd(_id: ID!, datos: ProductsInput): Products,
    deleteProd(_id: ID!): Products,
    deleteAll:Products,
  }
`);

const app = express()

app.use(express.json())

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
        allProds,
        oneProd,
        saveProd,
        updateProd,
        deleteProd,
        deleteAll,
    },
    graphiql: true,
 }));

module.exports = app;