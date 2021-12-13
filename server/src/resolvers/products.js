const resolvers = {
  Query: {
    products: async (_, {userId}, { dataSources }) => {
      const response = await dataSources.productAPI.getProducts(userId)
      return response
    },
  },
  Mutation: {
    // increments a track's numberOfViews property
    createProduct: async (_, args, { dataSources }) => {
      return dataSources.productAPI.createProduct(args)
    },
  },
  // Product: {
  //   author: ({ authorId }, _, { dataSources }) => {
  //     return dataSources.trackAPI.getAuthor(authorId);
  //   },

  //   modules: ({ id }, _, { dataSources }) => {
  //     return dataSources.trackAPI.getTrackModules(id);
  //   },

  //   durationInSeconds: ({length}) => length
  // },

  // Module: {
  //    durationInSeconds: ({length}) => length
  // }
};

export default resolvers;
