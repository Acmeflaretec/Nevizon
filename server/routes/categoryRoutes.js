const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getCategory, addCategory, deleteCategory ,updateCategory,getCategoryById} = require('../controllers/categoryController');
const { upload } = require('../middlewares/multer');

router.get('/', getCategory);
router.get('/:id', getCategoryById);
router.post("/",upload.single('image'), addCategory);
// router.post("/", authorization, upload.single('image'), addCategory);
// router.patch("/:id",authorization, updateCategory);
router.patch("/",upload.single('image'),updateCategory);
// router.delete("/:id", authorization, deleteCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
