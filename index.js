import express from "express";
import connectDb from "./connect.db.js";
import userRoutes from "./src/user/user.route.js";

const app = express();

//to make app understand json
app.use(express.json());

//connect database
connectDb();
//register routes
app.use(userRoutes);
//network port and server
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
