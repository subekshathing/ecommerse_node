import express from "express";

import {
  isSeller,
  isUser,
} from "../../middlewares/authentication.middleware.js";
import validateReqBody from "../../middlewares/middleware.validation.js";
import { addProductValidationSchema } from "./product.validation.js";
import Product from "./product.model.js";

import { validateIdFromReqParams } from "../../middlewares/valid.id.middleware.js";

const router = express.Router();
//add product
//steps
//1.login user must be seller
//2.validate req.body
//3.create product

router.post(
  "/product/add",
  isSeller,
  validateReqBody(addProductValidationSchema),
  async (req, res) => {
    //extract new product from req.body
    const newProduct = req.body;
    //extract loggedInUserId
    const loggedInUserId = req.loggedInUserId;
    newProduct.sellerId = loggedInUserId;

    //create product
    await Product.create(newProduct);
    return res.status(201).send({ message: "product is added." });
  }
);

//get product details
router.get(
  "/product/details/:id",
  isUser,
  validateIdFromReqParams,
  async (req, res) => {
    //extract product id from req.params
    const productId = req.params.id;

    //find product
    const product = await Product.findOne({ _id: productId });

    //if not throw error
    if (!product) {
      return res.status(401).send({ message: "product doe not exist" });
    }
    //send res
    return res.status(201).send({ message: "success", productDetail: product });
  }
);

//delete
router.delete(
  "/product/delete/:id",
  isSeller,
  validateIdFromReqParams,
  async (req, res) => {
    //extract product id from req.params
    const productId = req.params.id;
    //find product
    const product = await Product.findOne({ _id: productId });
    //if not product,throw error
    if (!product) {
      return res.status(401).send({ message: "product does not exist " });
    }
    //check product ownership:
    //to be product owner:product  sellerId must be equal to logged in user id
    const sellerId = product.sellerId;
    const loggedInUserId = req.loggedInUserId;
    // const isProductOwner=String(sellerId)===String(loggedInUserId)
    const isProductOwner = sellerId.equals(loggedInUserId);
    //if not product owner,throw error
    if (!isProductOwner) {
      return res
        .status(403)
        .send({ message: "you are not owner of this product" });
    }
    //delete product
    await Product.deleteOne(product);
    //send response
    return res.status(201).send({ message: "product removed successfully" });
  }
);

//edit product
router.put(
  "/product/edit/:id",
  isSeller,
  validateIdFromReqParams,
  validateReqBody(addProductValidationSchema),
  async (req, res) => {
    //extract product id from req.params
    const productId = req.params.id;

    //find product
    const product = await Product.findOne({ _id: productId });

    //if not product throw error
    if (!product) {
      return res.status(401).send({ message: "product does not exist" });
    }
    //check product ownership
    //to be product owner:product  sellerId must be equal to logged in user id
    const sellerId = product.sellerId;
    const loggedInUserId = req.loggedInUserId;

    const isProductOwner = sellerId.equals(loggedInUserId);

    if (!isProductOwner) {
      return res
        .status(403)
        .send({ message: "you are not owner of this product" });
    }
    // edit product
    //extract new product from req.body
    const newProduct = req.body;
    await Product.updateOne({ _id: productId }, { $set: { ...newProduct } });
    // send response
    return res.status(201).send({ message: "product is updated successfully" });
  }
);

export default router;
