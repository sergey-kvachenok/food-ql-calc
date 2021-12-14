import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import ParameterCard from './ParameterCard';

const TOTALS = gql`
  query Totals($userId: Int!) {
    totals(userId: $userId) {
      totals {
        calories
        carbohydrates
        fats
        proteins
      }
    }
  }
`;

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
    <Box className={classes.root}>
      <ParameterCard title="Proteins" value={proteins} />
      <ParameterCard title="Carbohydrates" value={carbohydrates} />
      <ParameterCard title="Fats" value={fats} />
      <ParameterCard title="Calories" value={calories} />
    </Box>
  );
};

export default DailyCard;
