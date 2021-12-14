import * as yup from 'yup';

const restrictions = {
  minPassword: 4,
  maxProduct: 25,
};

const messages = {
  number: 'Must be a number',
  required: 'This field is required',

  emailEmpty: 'Enter your email',
  emailInvalid: 'Enter a valid email',
  emailRequired: 'Email is required',

  passwordEmpty: 'Enter your password',
  passwordMinLength: `Password should be of minimum ${restrictions.minPassword} characters length`,
  passwordRequired: 'Password is required',
  passwordsMismatch: 'Passwords are not equal',

  productEmpty: 'Enter product title',
  productMaxLength: `Max ${restrictions.maxProduct} symbols`,
};

export const validationRules = {
  email: yup.string(messages.emailEmpty).email(messages.emailInvalid).required(messages.emailRequired),

  password: yup
    .string(messages.passwordEmpty)
    .min(restrictions.minPassword, messages.passwordMinLength)
    .required(messages.passwordRequired),

  repeatPassword: yup
    .string()
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], messages.passwordsMismatch),
    })
    .required(messages.passwordRequired),

  productTitle: yup
    .string(messages.productEmpty)
    .max(restrictions.maxProduct, messages.productMaxLength)
    .required(messages.required),

  product: yup.string().required(messages.required),

  numeric: yup.number().typeError(messages.number).required(messages.required),
};
