import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography } from '@mui/material';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    marginBottom: theme.spacing(1),
  },

  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
}));

const ParameterCard = ({ title, value }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} sx={{ borderRadius: '15px' }} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ParameterCard;
