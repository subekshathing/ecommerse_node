import mongoose from "mongoose";
export const validateIdFromReqParams = (req, res, next) => {
  //extract id from req.params
  const id = req.params.id;
  // console.log(req.params.id);
  const validMongoId = mongoose.isValidObjectId(id);
  //check for mongo id validity
  if (!validMongoId) {
    return res.status(401).send({ message: "invalid mongo id" });
  }
  //if not valid mongo id, throw error
  //call next function
  next();
};
