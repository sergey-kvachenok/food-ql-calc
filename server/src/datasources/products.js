import DBClient from '../utils/prisma.js';
import { codes } from '../constants/codes.js';
import { generateResponse, generateMetaResponse } from '../helpers/index.js';

const prisma = new DBClient();

class ProductAPI {
  async createProduct(data) {
    const { name, proteins, fats, carbohydrates, calories, userId } = data;
    try {
      const product = await prisma.product.create({
        data: {
          name,
          proteins,
          fats,
          carbohydrates,
          calories,
          userId,
        },
      });

      const message = `Successfully create a product ${name}`;
      const meta = generateMetaResponse(message);

      return { product, meta };
    } catch (err) {
      const message =
        err.code === codes.uniqueConstraints ? `The prooduct "${name}" already exists` : 'Something went wrong';

      const meta = generateMetaResponse(message, 400, false);

      return { meta };
    }
  }

  async getProduct(productId) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      const message = `Successfully find product with id ${productId}`;
      return generateResponse(product, message);
    } catch (err) {
      const message = JSON.stringify(err.extensions?.response?.message);
      return generateResponse(null, message);
    }
  }

  async getProducts(userId) {
    try {
      const products = await prisma.product.findMany({ where: { userId } });

      const message = `Successfully find products`;
      const meta = generateMetaResponse(message);
      return { products, meta };
    } catch (err) {
      const message = `Something went wrong`;
      const meta = generateMetaResponse(message, 400, false);
      return { meta };
    }
  }
}

export default ProductAPI;
