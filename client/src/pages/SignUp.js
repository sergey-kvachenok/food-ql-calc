import React, { useContext, useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Form from '../components/Form'
import { validationRules } from '../const/validation'

const validationSchema = yup.object({
  email: validationRules.email,
  password: validationRules.password,
  repeatPassword: validationRules.repeatPassword
});

const initialValues = {
  email: '',
  password: '',
  repeatPassword: ''
}

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    meta {
      message,
      code
    }
    user {
      id
      email,
    },
    token
  }
}
`;

const getRedirectLink = () => (<Link to='/signin'>
  Already have an account? Sign In
</Link>)

const SignUp = () => {
  const [errors, setErrors] = useState(null)
  const auth = useContext(AuthContext)

  const [register] = useMutation(REGISTER);

  const submit = async (values) => {
    setErrors(null)
    try {
         const {data} = await register({ variables: {email: values.email,
        password: values.password
        }});
    
        const {user, token, meta} = data?.register || {}

      if (meta.code === 400) {
        setErrors(meta)
      } else {
        auth.login(token, user.email, user.id)
      }
    } catch(apiError) {
      setErrors(apiError.errors)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submit,
  });

  return (
      <Form apiErrors={errors} formik={formik} getRedirectLink={getRedirectLink}/>
  )
}

export default SignUp