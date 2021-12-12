import DBClient from '../utils/prisma.js'
import {codes} from '../constants/codes.js'
import {generateResponse} from '../helpers/index.js'

const prisma = new DBClient()

class UserAPI { 
async getUser(email) {
  try {
        const user = await prisma.user.findUnique({
            where: { email},
          });

        const message = `Successfully find ${email} user`
        return generateResponse(user, message)
      } catch (err) {
        const message = JSON.stringify(err.extensions?.response?.message)
        return generateResponse(null, message)
      }
        
}

async getMeals(userId) {
  try {
        const meals = await prisma.meal.findMany({
            where: { userId },
          });

        const message = `Successfully find ${userId} user`
        return generateResponse(meals, message)
      } catch (err) {
        const message = JSON.stringify(err)
        return generateResponse(null, message)
      }       
}

async createUser(email) {
      try {
        const user = await prisma.user.create({
          data: {email}
        });

        const message = `Successfully create a user ${email}`
        return generateResponse(user, message)
      } catch (err) {
        const message = err.code === codes.uniqueConstraints ? `The user "${email}" already exists` : err.extensions?.response?.message
        return generateResponse(null, message, 400, false)
      }
}

async createMeal(userId, productId, weight) {
  try {
        const meal = await prisma.meal.create({
          data: {userId, productId, weight, date: new Date().toISOString()}
        });

        const message = `Successfully add a meal to the current user ${JSON.stringify(meal)}`
        return generateResponse(meal, message)
      } catch (err) {
        const message = err.code === codes.foreignKeyConstraint ? `The user with id ${userId} doesn't exists` : err.extensions?.response?.message
        return generateResponse(null, message, 400, false)
      }
}
}

export default UserAPI;