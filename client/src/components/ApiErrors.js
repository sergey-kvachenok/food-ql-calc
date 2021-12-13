import React from 'react';
import Alert from '@material-ui/lab/Alert';
import isObject from 'lodash.isobject'

const ApiErrors = ({errors}) => {
  if(Array.isArray(errors)) {
   return (
     <>
   {errors.map(({message, index}) => (<Alert key={`error-${index + 1}`} severity="error">
   {message}
   </Alert>))}
   </>
   )
       }

    if (isObject(errors)) {
      return <Alert severity="error">
  {errors.message}
  </Alert>

    }

  return <Alert severity="error">
  {errors}
  </Alert>
}


export default ApiErrors