import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { AuthContext } from '../context/AuthContext';
import Form from '../components/Form';
import { validationRules } from '../const/validation';

const validationSchema = yup.object({
  email: validationRules.email,
  password: validationRules.password,
});

const initialValues = {
  email: '',
  password: '',
};

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      meta {
        message
        code
      }
      user {
        id
        email
      }
      token
    }
  }
`;

const getRedirectLink = () => <Link to="/signup">Don't have an account? Sign Up</Link>;

const SignIn = () => {
  const [errors, setErrors] = useState(null);
  const auth = useContext(AuthContext);

  const [login] = useMutation(LOGIN);

  const submit = async values => {
    setErrors(null);
    try {
      const { data } = await login({ variables: { email: values.email, password: values.password } });

      const { user, token, meta } = data?.login || {};

      if (meta.code === 400) {
        setErrors(meta);
      } else {
        auth.login(token, user.email, user.id);
      }
    } catch (apiError) {
      setErrors(apiError.errors);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submit,
  });

  return <Form isSignin getRedirectLink={getRedirectLink} formik={formik} apiErrors={errors} />;
};

export default SignIn;
