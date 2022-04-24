const router = require("express").Router();
const {
  getCarts,
  add,
  update,
  deleteCart,
  getCart,
} = require("../controllers/Cart");

router.route("/").get(getCarts).post(add);
router.route("/:id").put(update).delete(deleteCart).get(getCart);

module.exports = router;
