import * as yup from "yup";
import axios from "axios";

axios.defaults.baseURL = "https://agrich.onrender.com/api/v1/admin";

const phoneRegExp = /^\d{3} \d{3} \d{4}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#;:])[A-Za-z\d@$!%*?&#;:]{8,}$/;


  export const signinValidate = yup.object().shape({
    email: yup.string().email("enter valid email").required("required"),
    password: yup
      .string()
      .required("required"),
  });

  export const  emailValidate = yup.object().shape({
    email:yup.string().email("enter valid email").required("required")
  })


  export const recoverPassword = yup.object().shape({
    otp:yup.string().max(6,"can't contain more than 6 characters").required("required"),
    username:yup.string().email("enter valid Username").required("required"),
    newPassword: yup
    .string()
    .min(8, "password must containat least 8 characters ")
    .matches(
      passwordRegExp,
      "characters with at least one of each: uppercase, lowercase, number and special"
    )
    .required("required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("required"),
  })

  export const addStaff= yup.object().shape({
    email: yup
    .string()
    .email('Please enter valid email')
    .required('Please enter email'),
  Name:yup.string().required(`Please enter staff last name `),
  phone: yup.string().required('Please enter mobile number'),
  lang: yup.string().required('Enter language'),
  userType: yup.string().required('Select Staff type'),
  })