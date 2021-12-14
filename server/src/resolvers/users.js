import { generateMetaResponse } from '../helpers/index.js';
import round from 'lodash.round';
import isEmpty from 'lodash.isempty';

const resolvers = {
  Query: {
    getUser: async (_, { email }, { dataSources }) => {
      return await dataSources.userAPI.getUser(email);
    },

    totals: async (_, { userId }, { dataSources }) => {
      const response = await dataSources.userAPI.getMeals(userId);
      const { meta: mealsMeta, meals } = response;
      if (mealsMeta.code === 400) {
        return mealsMeta;
      }

      let totals = meals.reduce((acc, meal) => {
        const { weight, product } = meal;

        const calories = (product.calories / 100) * weight + (acc.calories || 0);
        const carbohydrates = (product.carbohydrates / 100) * weight + (acc.carbohydrates || 0);
        const fats = (product.fats / 100) * weight + (acc.fats || 0);
        const proteins = (product.proteins / 100) * weight + (acc.proteins || 0);

        return {
          calories: round(calories, 2),
          carbohydrates: round(carbohydrates, 2),
          fats: round(fats, 2),
          proteins: round(proteins, 2),
        };
      }, {});
      if (isEmpty(totals)) {
        totals = null;
      }

      const message = 'The totals of today meals were successfully processed';
      const meta = generateMetaResponse(message);
      return { totals, meta };
    },
  },
  Mutation: {
    register: async (_, { email, password }, { dataSources }) => {
      return await dataSources.userAPI.register(email, password);
    },

    login: async (_, { email, password }, { dataSources }) => {
      return await dataSources.userAPI.login(email, password);
    },

    createMeal: async (_, args, { dataSources }) => {
      const { userId, productId, weight } = args;
      if (!weight || !userId) throw new Error('Invalid parameters');

      if (productId) {
        return await dataSources.userAPI.createMeal(userId, productId, weight);
      }

      const { name, proteins, fats, carbohydrates, calories } = args;
      if (!name || !proteins || !fats || !carbohydrates || !calories) throw new Error('Invalid parameters');

      const product = await dataSources.productAPI.createProduct(args);
      const { meta, product: createdProduct } = product;

      if (meta.code === 400) {
        return { meta };
      }

      return await dataSources.userAPI.createMeal(userId, createdProduct.id, weight);
    },
    createProduct: async (_, args, { dataSources }) => {
      return dataSources.productAPI.createProduct(args);
    },
  },
  User: {
    meals: async ({ id }, _, { dataSources }) => {
      const response = await dataSources.userAPI.getMeals(id);
      return response?.meals || [];
    },
    products: async ({ id }, _, { dataSources }) => {
      const product = await dataSources.productAPI.getProducts(id);
      return product.data;
    },
  },
  Meal: {
    product: async ({ productId }, _, { dataSources }) => {
      const product = await dataSources.productAPI.getProduct(productId);
      return product.data;
    },
  },
};

export default resolvers;
