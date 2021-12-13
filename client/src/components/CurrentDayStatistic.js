import React from 'react'
import { CircularProgress } from '@material-ui/core';
import { useFetch } from '../hooks/useFetch'
import { statisticRoutes } from '../api/apiRoutes'
import DailyCard from '../components/Card'
import ApiErrors from '../components/ApiErrors'

const CurrentDayStatistic = () => {
  const [statistic, isStatisticLoading, statisticFetchingError] = useFetch(statisticRoutes.currentDay)

  if (isStatisticLoading) {
    return <CircularProgress />
  }

  if (statisticFetchingError) {
    <ApiErrors errors={statisticFetchingError.errors}/>
  }
console.log(statistic)


  return null

}

export default CurrentDayStatistic