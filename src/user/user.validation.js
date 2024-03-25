import yup from "yup";
export const addRegisterUserVAlidation = yup.object({
  firstName: yup
    .string()
    .required("first name is required")
    .trim()
    .max(30, "first name must be at most 30 character"),
  lastName: yup
    .string()
    .required("last name is required")
    .trim()
    .max(30, "last name must be at most 30 character"),
  email: yup
    .string()
    .email("email must be valid")
    .required("email is required")
    .trim()
    .max(65, "email must be at most 65 character")
    .lowercase(),
  password: yup
    .string()
    .required("password is required")
    .trim()
    .min(6, "password must be at least 6 character")
    .max(20, "password must be at most 20 character"),
  role: yup
    .string()
    .required("role is required")
    .trim()
    .oneOf(["seller", "buyer"], "role must be either seller or buyer"),

  gender: yup.string().trim().oneOf(["male", "female", "preferNotToSay"]),
});

export const loginUserValidationSchema = yup.object({
  email: yup
    .string()
    .required()
    .trim()
    .email("must be a valid email address")
    .lowercase(),
  password: yup.string().required("password is required"),
});
