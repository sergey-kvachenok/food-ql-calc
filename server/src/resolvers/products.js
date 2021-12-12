import Prisma from '@prisma/client'

const {PrismaClient} = Prisma
const prisma = new PrismaClient()

const resolvers = {
  Query: {
    getProducts: async (_, __, { dataSources }) => {
      return await prisma.product.findMany()
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
