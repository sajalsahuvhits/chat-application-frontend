import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("*Email is required")
    .matches(
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
      "*Incorrect Email"
    ),
  password: yup.string().required("*Password is required"),
});

export const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .required("*Name is required")
    .matches(/^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$/, "*Use only alphabats"),
  email: yup
    .string()
    .required("*Email is required")
    .matches(
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
      "*Incorrect Email"
    ),
  // contact: yup
  //   .string()
  //   .required("*Contact is required")
  //   .matches(/^[0-9]+$/, "Must be only digits")
  //   .min(10, "Must be exactly 10 digits")
  //   .max(10, "Must be exactly 10 digits"),
  password: yup
    .string()
    .required("*Password is required")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#$@%&?]{8,20}$/,
      "*Password must have at least one Upper-case latter, one lower-case latter, one number and one special character!"
    )
    .min(8, "*Minimum 8 characters "),
  confirmPassword: yup
    .string()
    .required("*Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("*Old Password is required"),
  newPassword: yup
    .string()
    .required("*New Password is required")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#$@%&?]{8,20}$/,
      "*Password must have at least one Upper-case latter, one lower-case latter, one number and one special character!"
    )
    .min(8, "*Minimum 8 characters "),
  confirmPassword: yup
    .string()
    .required("*Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("*New Password is required")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@%&? "])[a-zA-Z0-9!#$@%&?]{8,20}$/,
      "*Password must have at least one Upper-case latter, one lower-case latter, one number and one special character!"
    )
    .min(8, "*Minimum 8 characters "),
  confirmPassword: yup
    .string()
    .required("*Confirm password is required")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

export const otpVerifySchema = yup.object().shape({
  otp: yup
    .string()
    .required("Please enter OTP.")
    .matches(/^\d{4}$/, "OTP must be a 4-digit number."),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("*Email is required")
    .matches(
      /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/,
      "*Incorrect Email"
    ),
});
