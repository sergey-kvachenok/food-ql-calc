import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import { useQuery, useMutation, gql } from '@apollo/client';
import * as yup from 'yup';
import {
   Button, Grid,  makeStyles, Container, Paper, Typography, IconButton
   } from '@material-ui/core';
   import ExpandLessIcon from '@material-ui/icons/ExpandLess';
   import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
   import { validationRules } from '../const/validation'
   import { sanitize } from '../helpers/form'
   import ApiErrors from '../components/ApiErrors'
   import SnackbarMessage from './Snackbar'

   import ExistingProductFields from './forms/ExistingProductFields'
   import NewProductBaseFields from './forms/NewProductFields'
   import { AuthContext } from '../context/AuthContext'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addButton: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  wrapper: {
    padding: theme.spacing(2)
  }
}));

const validationSchema = (addFormOpen) => yup.object({
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
  energy: ''
}

export const PRODUCTS = gql`
query Products($userId: Int!) {
  products(userId: $userId) {
    meta {
      message,
      code
    }
    products {
      name
      id
    }
  }
}
`;

export const CREATE_MEAL = gql`
mutation CreateProduct($userId: Int!, $weight: Float!, $productId: Int, $name: String, $proteins: Float, $fats: Float, $carbohydrates: Float, $calories: Float) {
  createMeal(userId: $userId, weight: $weight, productId: $productId, name: $name, proteins: $proteins, fats: $fats, carbohydrates: $carbohydrates, calories: $calories) {
    meta {
      message
    }
    meal {
      date
      weight
      userId
      product {
        name
      }
    }
  }
}
`;

const getOpenFormButton = (addFormOpen, onClick) => (
  <>
            <IconButton aria-label="open-add-form" onClick={onClick}>
 {addFormOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
</IconButton>
{addFormOpen ? '' :<p>Not in the list?</p>}
</>
)

const getMenuItems = (products = []) => products.map(({id, name}) => ({id, name}))

const AddProduct = () => {
  const classes = useStyles()
   const {userId} = useContext(AuthContext)

   const { loading, error, data } = useQuery(PRODUCTS, {
     variables: {
       userId
     }
   });
   const [createMeal] = useMutation(CREATE_MEAL);

  const [addFormOpen, setAddFormOpen] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [snackbarMessage, setSnackbarMessage] = useState(null)
    const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(addFormOpen),
    onSubmit: (values) => submitForm(values),
  });

   if (loading) return <div>Loading...</div>
    let apiErrors = error
   const  {products, meta} = data.products

   if (meta.code===400) {
apiErrors = meta
   }

    const selectMenuItems = getMenuItems(products)

  const submitForm = async (values) => {
    const sanitizedValues = sanitize(values)
    const { product, weight, carbohydrates, fats, proteins, energy, name } = sanitizedValues
    setSubmitError(null)

    try {
      if (addFormOpen) {
        await createMeal({variables: {userId, weight, carbohydrates, fats, proteins, calories: energy, name}})
      } else {
         await createMeal({variables: {userId, weight, productId: product}})
      }

      resetForm()
      setSnackbarMessage('Your data was saved')
    } catch(apiError) {
      setSubmitError(apiError.errors)
    }
  }


  const { handleSubmit, isSubmitting, resetForm } = formik

const handleAddFormOpen = () => {
  setAddFormOpen(!addFormOpen)
}

return (<Container maxWidth="xs">
  <Paper className={classes.wrapper}>
  <Typography
  className={classes.header}
  align="center"
   variant="h5">
  Add Product
</Typography>
  <form  onSubmit={handleSubmit} noValidate autoComplete="off">
 <Grid container spacing={3}>
 <ExistingProductFields
 formik={formik}
  selectMenuItems={selectMenuItems}
   classes={classes}
    addFormOpen={addFormOpen} />

{getOpenFormButton(addFormOpen, handleAddFormOpen)}
{addFormOpen && <NewProductBaseFields formik={formik} classes={classes} />}
        </Grid> 
        <Button disabled={isSubmitting} type='submit' className={classes.addButton} variant="contained" color="primary">
  Add
</Button>
</form>
{apiErrors && <ApiErrors errors={apiErrors} />}
</Paper>
{snackbarMessage && <SnackbarMessage message={snackbarMessage} closeMessage={() => {setSnackbarMessage(null)}}/>}
</Container>)
}

export default AddProduct