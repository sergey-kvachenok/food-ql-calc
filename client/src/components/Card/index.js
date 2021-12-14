import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import ParameterCard from './ParameterCard';
import { TOTALS } from '../../const/queries';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

const DailyCard = () => {
  const classes = useStyles();
  const { userId } = useContext(AuthContext);
  const { loading, error, data } = useQuery(TOTALS, {
    variables: {
      userId,
    },
  });

  const { totals } = data?.totals || {};

  if (!totals) return null;
  const { calories, carbohydrates, fats, proteins } = totals || {};

  return (
    <Box>
      <Typography color="textPrimary" variant="h6" gutterBottom>
        Total today:
      </Typography>
      <Box className={classes.root}>
        <ParameterCard title="Proteins" value={proteins} />
        <ParameterCard title="Carbohydrates" value={carbohydrates} />
        <ParameterCard title="Fats" value={fats} />
        <ParameterCard title="Calories" value={calories} />
      </Box>
    </Box>
  );
};

export default DailyCard;
