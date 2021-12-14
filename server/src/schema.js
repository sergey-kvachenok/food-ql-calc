import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    products(userId: Int!): CreateProductsResponse
    getUser(email: String!): CreateUserResponse
    totals(userId: Int!): CreateTotalsResponse
  }

  type Mutation {
    createProduct(
      userId: Int!
      name: String!
      proteins: Float!
      fats: Float!
      carbohydrates: Float!
      calories: Float!
    ): CreateProductResponse

    register(email: String!, password: String!): CreateUserResponse
    login(email: String!, password: String!): CreateUserResponse
    createMeal(
      userId: Int!
      productId: Int
      weight: Float!
      name: String
      proteins: Float
      fats: Float
      carbohydrates: Float
      calories: Float
    ): CreateMealResponse
  }

  type Meta {
    code: Int!
    success: Boolean!
    message: String!
  }

  interface Response {
    code: Int!
    success: Boolean!
    message: String!
  }

  type CreateUserResponse {
    meta: Meta!
    user: User
    token: String
  }

  type CreateMealResponse {
    meta: Meta!
    meal: Meal
  }

  type CreateTotalsResponse {
    meta: Meta!
    totals: Total
  }

  type CreateProductResponse {
    meta: Meta!
    product: Product
  }

  type CreateProductsResponse {
    meta: Meta!
    products: [Product]!
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
    meals: [Meal]!
    products: [Product]
  }

  type Meal {
    product: Product!
    userId: Int!
    weight: Float!
    date: String!
  }

  type Total {
    proteins: Float!
    fats: Float!
    carbohydrates: Float!
    calories: Float!
  }
`;

export default typeDefs;
