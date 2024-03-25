import express from "express";
import {
  addRegisterUserVAlidation,
  loginUserValidationSchema,
} from "./user.validation.js";

import User from "./user.model.js";
import bcrypt from "bcrypt";
import validateReqBody from "../../middlewares/middleware.validation.js";
import jwt from "jsonwebtoken";
const router = express.Router();
//register user
//its just creating a new user
//do not forget to hash password before saving user info in db
router.post(
  "/user/register",
  async (req, res, next) => {
    //extract data from req.body
    const data = req.body;
    //validate data using schema
    try {
      const validatedData = await addRegisterUserVAlidation.validate(data);
      req.body = validatedData;
      //if validation failed throw error
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }

    //call next function
    next();
  },
  async (req, res) => {
    //extract new user from req.body
    const newUser = req.body;
    //check user provided email already exist or not
    //find user by email
    const user = await User.findOne({ email: newUser.email });
    //if  email, throw error
    if (user) {
      return res.status(401).send({ message: "user already exist" });
    }

    //just before saving user, we need to hash password
    const plainPassword = newUser.password;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
    //update new user with hashed password
    newUser.password = hashedPassword;
    //save user
    await User.create(newUser);
    //send response
    return res.status(201).send({ message: "user register successfully" });
  }
);

//login
router.post(
  "/user/login",
  validateReqBody(loginUserValidationSchema),
  async (req, res) => {
    // extract login credentials from req.body
    const loginCredintials = req.body;
    // find user by using email from login credentials
    const user = await User.findOne({ email: loginCredintials.email });
    // if user not found, throw new error
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials" });
    }
    // check for password match
    const plainPassword = loginCredintials.password;
    const hashedPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    // if not password match, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "invalid credentials" });
    }
    // generate access token
    const payload = { email: user.email };
    const token = jwt.sign(payload, "46b0d0ffa98025ab6d77");
    //to hide
    user.password = undefined;

    // send response
    return res
      .status(200)
      .send({ message: "success", userDetail: user, token });
  }
);
export default router;
