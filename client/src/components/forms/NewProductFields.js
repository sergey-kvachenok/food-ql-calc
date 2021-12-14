import { TextField, Grid, FormControl } from '@mui/material';

const NewProductFields = ({ formik, classes }) => {
  const { values, handleChange, touched, errors } = formik;

  return (
    <>
      <Grid item xs={12}>
        <FormControl variant="filled" className={classes.formControl}>
          <TextField
            id="outlined-basic"
            label="Product Name"
            placeholder="Enter product name"
            variant="outlined"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl variant="filled" className={classes.formControl}>
          <TextField
            id="outlined-basic"
            label="Fats"
            variant="outlined"
            name="fats"
            type="number"
            placeholder="per 100gr"
            value={values.fats}
            onChange={handleChange}
            error={touched.fats && Boolean(errors.fats)}
            helperText={touched.fats && errors.fats}
          />
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl variant="filled" className={classes.formControl}>
          <TextField
            id="outlined-basic"
            label="Proteins"
            variant="outlined"
            name="proteins"
            type="number"
            placeholder="per 100gr"
            value={values.proteins}
            onChange={handleChange}
            error={touched.proteins && Boolean(errors.proteins)}
            helperText={touched.proteins && errors.proteins}
          />
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl variant="filled" className={classes.formControl}>
          <TextField
            id="outlined-basic"
            label="Carbohydrates"
            variant="outlined"
            name="carbohydrates"
            type="number"
            placeholder="per 100gr"
            value={values.carbohydrates}
            onChange={handleChange}
            error={touched.carbohydrates && Boolean(errors.carbohydrates)}
            helperText={touched.carbohydrates && errors.carbohydrates}
          />
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl variant="filled" className={classes.formControl}>
          <TextField
            id="outlined-basic"
            label="Energy"
            variant="outlined"
            name="energy"
            type="number"
            placeholder="per 100gr"
            value={values.energy}
            onChange={handleChange}
            error={touched.energy && Boolean(errors.energy)}
            helperText={touched.energy && errors.energy}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default NewProductFields;
