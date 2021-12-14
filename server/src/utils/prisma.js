import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class DBClient {
  constructor() {
    if (!DBClient.instance) {
      DBClient.instance = new PrismaClient();
    }
    return DBClient.instance;
  }

  static getInstance() {
    return DBClient.instance;
  }
}

export default DBClient;
