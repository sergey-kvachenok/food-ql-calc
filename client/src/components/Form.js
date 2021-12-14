import React from 'react';
import { Avatar, Button, CssBaseline, TextField, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import ApiErrors from '../components/ApiErrors';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const Form = ({ getRedirectLink, formik, apiErrors, isSignin = false }) => {
  const classes = useStyles();
  const { values, handleChange, touched, errors, handleSubmit, isSubmitting } = formik;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignin ? 'Sign In' : 'Sign Up'}
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          {!isSignin && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              id="repeatPassword"
              onChange={handleChange}
              error={touched.repeatPassword && Boolean(errors.repeatPassword)}
              helperText={touched.repeatPassword && errors.repeatPassword}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
            sx={{ marginTop: '16px', marginBottom: '16px' }}
          >
            {isSignin ? 'Sign In' : 'Sign Up'}
          </Button>
          {getRedirectLink()}
        </form>
      </div>
      {apiErrors && <ApiErrors errors={apiErrors} />}
    </Container>
  );
};

export default Form;
