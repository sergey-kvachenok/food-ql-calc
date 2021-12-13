// user
const apiUserPath = '/api/users';
export const userRoutes = {
  signin: `${apiUserPath}/signin`,
  signup: `${apiUserPath}/signup`
}

// product
const apiProductPath = '/api/products';
export const productRoutes = {
  products: apiProductPath
}

// statistic
const apiStatisticPath = '/api/statistic';
export const statisticRoutes = {
  statistic: apiStatisticPath,
  currentDay: `${apiStatisticPath}/current-day`
}