import jwt from "jsonwebtoken";
import User from "../src/user/user.model.js";
export const isSeller = async (req, res, next) => {
  //extract authorization from req.header
  const authorization = req?.headers?.authorization;

  //extract token from authorization
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  //if not token throw error
  if (!token) {
    return res.status(401).send({ message: "unauthorized token" });
  }
  let payload;
  try {
    //verify token
    payload = jwt.verify(token, "46b0d0ffa98025ab6d77");
  } catch (error) {
    return res.status(401).send({ message: "unauthorized payload" });
  }
  //find user by email from payload
  const user = await User.findOne({ email: payload.email });
  //if not user
  if (!user) {
    return res.status(401).send({ message: "unauthorized user" });
  }

  //check for user role, user role must be seller
  if (user.role !== "seller") {
    return res.status(401).send({ message: "unauthorized seller" });
  }
  //add sellerId to req
  req.loggedInUserId = user._id;
  //call next function
  next();
};
export const isBuyer = async (req, res, next) => {
  //extract authorization from req.header
  const authorization = req?.headers?.authorization;

  //extract token from authorization
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  //if not token throw error
  if (!token) {
    return res.status(401).send({ message: "unauthorized" });
  }
  let payload;
  try {
    //verify token
    payload = jwt.verify(token, "46b0d0ffa98025ab6d77");
  } catch (error) {
    return res.status(401).send({ message: "unauthorized" });
  }
  //find user by email from payload
  const user = await User.findOne({ email: payload.email });
  //if not user
  if (!user) {
    return res.status(401).send({ message: "unauthorized" });
  }
  //check for user role, user role must be seller
  if (user.role !== "buyer") {
    return res.status(401).send({ message: "unauthorized" });
  }
  //add buyerId to req
  req.loggedInUserId = user._id;

  //call next function
  next();
};
export const isUser = async (req, res, next) => {
  //extract authorization from req.header
  const authorization = req?.headers?.authorization;

  //extract token from authorization
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  //if not token throw error
  if (!token) {
    return res.status(401).send({ message: "unauthorized" });
  }
  let payload;
  try {
    //verify token
    payload = jwt.verify(token, "46b0d0ffa98025ab6d77");
  } catch (error) {
    return res.status(401).send({ message: "unauthorized" });
  }
  //find user by email from payload
  const user = await User.findOne({ email: payload.email });
  //if not user
  if (!user) {
    return res.status(401).send({ message: "unauthorized" });
  }
  //add userId to req
  req.loggedInUserId = user._id;
  //call next function
  next();
};
