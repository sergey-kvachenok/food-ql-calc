import DBClient from '../utils/prisma.js'
import {codes} from '../constants/codes.js'

const prisma= new DBClient()

class ProductAPI { 
async createProduct(data) {
   const {name} = data
      try {
        const product = await prisma.product.create({
          data
        });

        return {
          code: 200,
          success: true,
          message: `Successfully create a product ${name}`,
          product,
        };
      } catch (err) {
        const message = err.code === codes.uniqueConstraints ? `The prooduct "${name}" already exists` : err.extensions?.response?.message
        return {
          code: err.extensions?.response?.status || 400,
          success: false,
          message,
          product: null,
        };
      }
}
}

export default ProductAPI;