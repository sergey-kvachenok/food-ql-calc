import {gql} from 'apollo-server';

const typeDefs = gql`
type Query {
  getProducts: [Product!]
  getUser(email: String!): CreateUserResponse
  getMeals(userId: Int!): CreateMealsResponse
}

type Mutation {
  createProduct(name: String!, proteins: Float!, fats: Float!, carbohydrates: Float!, calories: Float!): CreateProductResponse,

  createUser(email: String!): CreateUserResponse,
  createMeal(userId: Int!, productId: Int!, weight: Float!): CreateMealResponse
}

interface Response {
    code: Int!
   success: Boolean!
   message: String!
}

type CreateUserResponse implements Response {
   code: Int!
   success: Boolean!
   message: String!
    data: User
}

type CreateMealResponse implements Response {
   code: Int!
   success: Boolean!
   message: String!
    data: Meal
}

type CreateMealsResponse implements Response {
   code: Int!
   success: Boolean!
   message: String!
    data: [Meal]
}

type CreateProductResponse implements Response {
   code: Int!
   success: Boolean!
   message: String!
    data: Meal
}

type Product {
  id: Int!
  name: String!
  proteins: Float!
  fats: Float!
  carbohydrates: Float!
  calories: Float!
}

type User {
  id: Int!
  email: String!
  meals: [Meal]
}

type Meal {
  productId: Int!
  userId: Int!
  weight: Float!
  date: String!
}
`;

export default typeDefs;
