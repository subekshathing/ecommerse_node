import express from "express";
import { addRegisterUserVAlidation } from "./user.validation.js";
import User from "./user.model.js";
import bcrypt from "bcrypt";
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
export default router;
