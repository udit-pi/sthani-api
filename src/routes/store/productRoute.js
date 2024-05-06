const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { getProducts } = require('../../controllers/store/product.controller');


const router = express.Router();

// router.get('/getProducts', validate(productValidation.getProducts), productController.getProducts);
router.get('/:product_id',getProducts );


module.exports = router;