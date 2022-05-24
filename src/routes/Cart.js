const router = require("express").Router();
const {
  getCarts,
  add,
  update,
  deleteCart,
  getCart,
} = require("../controllers/Cart");
const {
  checkTokenAndAuthorization,
  checkTokenAndAdmin,
} = require("../middlewares/auth");

router
  .route("/")
  .get(checkTokenAndAdmin, getCarts)
  .post(checkTokenAndAuthorization, add);
router
  .route("/:id")
  .put(checkTokenAndAuthorization, update)
  .delete(checkTokenAndAuthorization, deleteCart)
  .get(checkTokenAndAuthorization, getCart);

module.exports = router;
