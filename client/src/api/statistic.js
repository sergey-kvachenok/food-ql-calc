import { sendGetRequest, sendPostRequest } from './request';
import { statisticRoutes } from './apiRoutes'

export const addStatistic = (data) => sendPostRequest(statisticRoutes.statistic, data);
export const getCurrentDay = () => sendGetRequest(statisticRoutes.currentDay)