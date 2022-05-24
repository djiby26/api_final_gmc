const router = require("express").Router();
const {
  getOneOrder,
  getOrders,
  getOrdersByUserId,
  addOrder,
  deleteOrder,
} = require("../controllers/Order");
const {
  checkTokenAndAdmin,
  checkTokenAndAuthorization,
  checkToken,
} = require("../middlewares/auth");

router.route("/").get(checkTokenAndAdmin, getOrders).post(checkToken, addOrder);
router
  .route("/:id")
  .delete(checkTokenAndAuthorization, deleteOrder)
  .get(checkTokenAndAuthorization, getOrdersByUserId);

module.exports = router;
