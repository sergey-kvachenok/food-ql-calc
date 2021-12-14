import { Select, TextField, MenuItem, Grid, FormControl, InputLabel, FormHelperText } from '@mui/material';

const ExistingProductFields = ({ formik, selectMenuItems, classes, addFormOpen }) => {
  const { values, handleChange, touched, errors } = formik;

  return (
    <>
      {!addFormOpen && (
        <Grid item xs={6}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="saved-products-label">Saved Products</InputLabel>
            <Select
              labelId="saved-products-label"
              id="saved-products"
              name="product"
              value={values.product}
              onChange={handleChange}
              error={touched.product && Boolean(errors.product)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {selectMenuItems.map(({ name, id }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{touched.product && errors.product}</FormHelperText>
          </FormControl>
        </Grid>
      )}

      <Grid item xs={addFormOpen ? 12 : 6}>
        <FormControl variant="filled" className={classes.formControl}>
          <TextField
            id="outlined-basic"
            label="Weight(g)"
            variant="outlined"
            name="weight"
            type="number"
            value={values.weight}
            onChange={handleChange}
            error={touched.weight && Boolean(errors.weight)}
            helperText={touched.weight && errors.weight}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default ExistingProductFields;
