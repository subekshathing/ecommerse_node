//this is not part of our project
import crypto from "crypto";

const getRandomText = () => {
  const randomText = crypto.randomBytes(10).toString("hex");

  console.log(randomText);
};

getRandomText();
