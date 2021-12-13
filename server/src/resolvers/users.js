const resolvers = {
  Query: {
    getUser: (_, {email}, { dataSources }) => {
     return dataSources.userAPI.getUser(email)
    },

    getMeals: async (_, {userId}, { dataSources }) => {
     return await dataSources.userAPI.getMeals(userId)
    },
  },
  Mutation: {
    register: async (_, {email, password}, { dataSources }) => {
      return await dataSources.userAPI.register(email, password)
    },

    login: async (_, {email, password}, { dataSources }) => {
      return await dataSources.userAPI.login(email, password)
    },

    createMeal: async (_, args, { dataSources }) => {
      const {userId, productId, weight} = args
      if (!weight || !userId) throw new Error('Invalid parameters')

      if (productId) {
        return await dataSources.userAPI.createMeal(userId, productId, weight)
      }
  
        const {name, proteins, fats, carbohydrates, calories} = args
         if (!name || !proteins || !fats || !carbohydrates || !calories) throw new Error('Invalid parameters')

      const product = await dataSources.productAPI.createProduct(args)
      const {meta, product: createdProduct} = product
  
      if (meta.code === 400) {
        return {meta}
      }
    
      return await dataSources.userAPI.createMeal(userId, createdProduct.id, weight)
    },
     createProduct: async (_, args, { dataSources }) => {
      return dataSources.productAPI.createProduct(args)
    },
  },
  User: {
   meals: async ({id}, _, { dataSources }) => {
     const meals = await dataSources.userAPI.getMeals(id)
      return meals.data || []
    },
     products: async ({id}, _, { dataSources }) => {
      const product = await dataSources.productAPI.getProducts(id)
      return product.data
    }

  },
  Meal: {
    product: async ({productId}, _, { dataSources }) => {
      const product = await dataSources.productAPI.getProduct(productId)
      return product.data
    }
  },
};

export default resolvers;
