const resolvers = {
  Query: {
    products: async (_, { userId }, { dataSources }) => {
      const response = await dataSources.productAPI.getProducts(userId);
      return response;
    },
  },
  Mutation: {
    createProduct: async (_, args, { dataSources }) => {
      return dataSources.productAPI.createProduct(args);
    },
  },
};

export default resolvers;
