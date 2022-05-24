const express = require("express");
const app = express();
require("./config/db");
require("dotenv").config();
const cors = require("cors");

const productRoute = require("./src/routes/Product");
const cartRoute = require("./src/routes/Cart");
const userRoute = require("./src/routes/UserAuth");
const orderRoute = require("./src/routes/Order");

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api", userRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT || 3001, () => {
  console.log("server running at http://localhost:3001");
});
