import { sendPostRequest } from './request';
import { productRoutes } from './apiRoutes'

export const addProduct = (data) => sendPostRequest(productRoutes.products, data);