import { sendPostRequest } from './request';
import { userRoutes } from './apiRoutes'

export const signInUser = (data) => sendPostRequest(userRoutes.signin, data);
export const signUpUser = (data) => sendPostRequest(userRoutes.signup, data)