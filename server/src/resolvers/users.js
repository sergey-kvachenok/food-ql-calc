const resolvers = {
  Query: {
    // getProducts: async (_, __, { dataSources }) => {
    //   return await prisma.product.findMany()
    // },

    getUser: (_, {email}, { dataSources }) => {
     return dataSources.userAPI.getUser(email)
    },

    getMeals: async (_, {userId}, { dataSources }) => {
     return await dataSources.userAPI.getMeals(userId)
    },
  },
  Mutation: {
    createUser: async (_, {email}, { dataSources }) => {
      return await dataSources.userAPI.createUser(email)
    },

    createMeal: async (_, {userId, productId, weight}, { dataSources }) => {
      return await dataSources.userAPI.createMeal(userId, productId, weight)
    },
  },
  User: {
   meals: async ({id}, _, { dataSources }) => {
     const meals = await dataSources.userAPI.getMeals(id)
     console.log('meals', meals)
      return meals.data
    }
  },
  // Meal: {
  //   user: async ({ userId }, _, { dataSources }) => {
  //     return dataSources.userAPI.getUser(userId)
  //   }
  // },

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
