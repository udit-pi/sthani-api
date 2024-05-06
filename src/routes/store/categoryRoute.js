const express = require('express');


const { getcategory } = require('../../controllers/store/category.controller');
const { getFiltercategory } = require('../../controllers/store/filter.controller');


const router = express.Router();

// router.get('/getProducts', validate(productValidation.getProducts), productController.getProducts);
router.get('/:categoryId',getcategory );
router.post('/:categoryId/products/filter', getFiltercategory  )

module.exports = router;