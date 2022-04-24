const router = require("express").Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
} = require("../controllers/Products");
const {
  checkTokenAndAuthorization,
  checkTokenAndAdmin,
} = require("../middlewares/auth");

router.route("/").get(getProducts).post(checkTokenAndAdmin, addProduct);
router
  .route("/:id")
  .delete(checkTokenAndAdmin, deleteProduct)
  .put(checkTokenAndAdmin, updateProduct)
  .get(getOneProduct);

module.exports = router;
