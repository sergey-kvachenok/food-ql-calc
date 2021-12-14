import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DBClient from '../utils/prisma.js';
import { codes } from '../constants/codes.js';
import { generateResponse, generateMetaResponse } from '../helpers/index.js';

const prisma = new DBClient();

class UserAPI {
  async register(email, password) {
    if (!email || !password) throw new Error('Invalid credentials');

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.SECRET,
        {
          expiresIn: '30d',
        },
      );

      const message = `Successfully create a user ${email}`;
      const meta = generateMetaResponse(message);
      return { meta, user, token };
    } catch (err) {
      const message =
        err.code === codes.uniqueConstraints ? `Current email "${email}" is already in use` : 'Something went wrong';

      const meta = generateMetaResponse(message, 400, false);

      return { meta };
    }
  }

  async login(email, password) {
    if (!email || !password) throw new Error('Invalid credentials');
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw new Error("Current user doesn't exist");

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.SECRET,
        {
          expiresIn: '30d',
        },
      );

      const message = `Successfully create a user ${email}`;
      const meta = generateMetaResponse(message);
      return { user, token, meta };
    } catch (err) {
      let message = err?.extensions?.response?.message || err.message;

      if (err.code === codes.uniqueConstraints) {
        message = `Current email "${email}" is already in use`;
      }

      const meta = generateMetaResponse(message, 400, false);
      return { meta };
    }
  }

  async getUser(email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      const message = `Successfully find ${email} user`;
      return generateResponse(user, message);
    } catch (err) {
      const message = JSON.stringify(err.extensions?.response?.message);
      return generateMetaResponse(message, 400, false);
    }
  }

  async getMeals(userId) {
    const currentDate = new Date();
    const todayLowest = new Date(currentDate.setHours(0, 0, 0, 0)).toISOString();
    const todayGreatest = new Date(currentDate.setHours(23, 59, 59, 59)).toISOString();

    try {
      const meals =
        (await prisma.meal.findMany({
          where: {
            userId,
            date: {
              gte: todayLowest,
              lt: todayGreatest,
            },
          },
          include: {
            product: true,
          },
        })) || [];

      console.log('meals', meals);

      const message = `Successfully find ${userId} user`;
      const meta = generateMetaResponse(message);
      return { meals, meta };
    } catch (err) {
      const message = err?.message || 'Something went wrong';
      const meta = generateMetaResponse(message);
      return { meta };
    }
  }

  async createMeal(userId, productId, weight) {
    try {
      const meal = await prisma.meal.create({
        data: { userId, productId, weight, date: new Date().toISOString() },
      });

      const message = `Successfully add a meal to the current user ${JSON.stringify(meal)}`;
      const meta = generateMetaResponse(message);
      return { meta, meal };
    } catch (err) {
      const message =
        err.code === codes.foreignKeyConstraint
          ? `The user with id ${userId} doesn't exists`
          : err.extensions?.response?.message;
      const meta = generateMetaResponse(message, 400, false);
      return { meta };
    }
  }
}

export default UserAPI;
