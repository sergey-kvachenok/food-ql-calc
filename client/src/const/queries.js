import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query Products($userId: Int!) {
    products(userId: $userId) {
      meta {
        message
        code
      }
      products {
        name
        id
      }
    }
  }
`;

export const CREATE_MEAL = gql`
  mutation CreateProduct(
    $userId: Int!
    $weight: Float!
    $productId: Int
    $name: String
    $proteins: Float
    $fats: Float
    $carbohydrates: Float
    $calories: Float
  ) {
    createMeal(
      userId: $userId
      weight: $weight
      productId: $productId
      name: $name
      proteins: $proteins
      fats: $fats
      carbohydrates: $carbohydrates
      calories: $calories
    ) {
      meta {
        message
      }
      meal {
        date
        weight
        userId
        product {
          name
        }
      }
    }
  }
`;

export const TOTALS = gql`
  query Totals($userId: Int!) {
    totals(userId: $userId) {
      totals {
        calories
        carbohydrates
        fats
        proteins
      }
    }
  }
`;
