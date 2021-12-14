import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import * as yup from 'yup';
import { makeStyles } from '@mui/styles';
import { Button, Grid, Box, Paper, Typography, IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { sanitize } from '../helpers/form';
import ApiErrors from '../components/ApiErrors';
import SnackbarMessage from './Snackbar';
import ExistingProductFields from './forms/ExistingProductFields';
import NewProductBaseFields from './forms/NewProductFields';
import { AuthContext } from '../context/AuthContext';
import { validationRules } from '../const/validation';
import { PRODUCTS, CREATE_MEAL, TOTALS } from '../const/queries';

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addButton: {
    width: '100%',
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  wrapper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

const validationSchema = addFormOpen =>
  yup.object({
    product: !addFormOpen && validationRules.product,
    weight: validationRules.numeric.nullable(),
    name: addFormOpen && validationRules.productTitle,
    fats: addFormOpen && validationRules.numeric,
    proteins: addFormOpen && validationRules.numeric,
    carbohydrates: addFormOpen && validationRules.numeric,
    energy: addFormOpen && validationRules.numeric,
  });

const initialValues = {
  product: '',
  weight: '',
  name: '',
  fats: '',
  proteins: '',
  carbohydrates: '',
  energy: '',
};

const getOpenFormButton = (addFormOpen, onClick) => (
  <>
    <IconButton aria-label="open-add-form" onClick={onClick}>
      {addFormOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
    </IconButton>
    {addFormOpen ? '' : <p>Not in the list?</p>}
  </>
);

const getMenuItems = (products = []) => products.map(({ id, name }) => ({ id, name }));

const AddProduct = () => {
  const classes = useStyles();
  const { userId } = useContext(AuthContext);

  const { loading, error, data } = useQuery(PRODUCTS, {
    variables: {
      userId,
    },
  });

  const [createMeal] = useMutation(CREATE_MEAL, {
    refetchQueries: [
      {
        query: PRODUCTS,
        variables: { userId },
      },
      {
        query: TOTALS,
        variables: { userId },
      },
    ],
  });

  const [addFormOpen, setAddFormOpen] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(addFormOpen),
    onSubmit: values => submitForm(values),
  });

  const { products, meta } = data?.products || {};

  useEffect(() => {
    if (meta?.code === 400) {
      setApiError(meta);
    }
  }, [meta]);

  if (loading) return <div>Loading...</div>;

  const selectMenuItems = getMenuItems(products);

  const submitForm = async values => {
    const sanitizedValues = sanitize(values);
    const { product, weight, carbohydrates, fats, proteins, energy, name } = sanitizedValues;
    setApiError(null);

    try {
      if (addFormOpen) {
        await createMeal({ variables: { userId, weight, carbohydrates, fats, proteins, calories: energy, name } });
      } else {
        await createMeal({ variables: { userId, weight, productId: product } });
      }

      resetForm();
      setSnackbarMessage('Your data was saved');
    } catch (apiError) {
      setApiError(apiError.errors);
    }
  };

  const { handleSubmit, isSubmitting, resetForm } = formik;

  const handleAddFormOpen = () => {
    setAddFormOpen(!addFormOpen);
  };

  return (
    <Box>
      <Paper className={classes.wrapper}>
        <Typography className={classes.header} align="center" variant="h5">
          Add Product
        </Typography>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <ExistingProductFields
              formik={formik}
              selectMenuItems={selectMenuItems}
              classes={classes}
              addFormOpen={addFormOpen}
            />

            {getOpenFormButton(addFormOpen, handleAddFormOpen)}
            {addFormOpen && <NewProductBaseFields formik={formik} classes={classes} />}
          </Grid>

          <Button
            sx={{ marginTop: '16px' }}
            disabled={isSubmitting}
            type="submit"
            className={classes.addButton}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </form>
        {apiError && <ApiErrors errors={apiError} />}
      </Paper>
      {snackbarMessage && (
        <SnackbarMessage
          message={snackbarMessage}
          closeMessage={() => {
            setSnackbarMessage(null);
          }}
        />
      )}
    </Box>
  );
};

export default AddProduct;
