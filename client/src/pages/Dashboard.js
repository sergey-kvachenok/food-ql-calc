import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import AddProduct from '../components/AddProduct';
import DailyCard from '../components/Card';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '500px',
    margin: 'auto',
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <AddProduct />
      <DailyCard />
    </Box>
  );
};

export default Dashboard;
