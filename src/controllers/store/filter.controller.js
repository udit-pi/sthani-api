
const catchAsync = require("../../utils/catchAsync");
const pick = require("../../utils/pick");
const Category = require('../../models/category.model');
const Product = require('../../models/product.model');
const ApiError = require("../../utils/ApiError");
const httpStatus = require("http-status");
const { filters } = require("../../services/store/filter.service");
const getFiltercategory=catchAsync(async(req,res)=>{


    const query = pick(req.query, ['sort', 'page']);
    const { categoryId } = req.params
    const { sort } = query;
    const filterData =req.body.filter
    const category = await Category.findById(categoryId);
    if (!category)throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');

    let productsQuery =await Product.find({ categories: categoryId });

    //filter or paginate function
     let FilterProducts= filters(productsQuery,query,filterData)

//  const product = FilterProducts.sortedProducts
//  const pageNumber = FilterProducts.page
   
// const response = {
//     status: 200,
//     message: 'Success',
//     data: {
//         products: products.map(product => ({
//             name: product.name,
//             description_short: product.description_short,
//             image: product.image,
//             price: product.price,
//             price_discounted: product.discounted_price,
//             brand: {
//                 brand_id: product.brand_id,
//                 name: product.brand_name // Assuming brand_name is a field in the product schema
//             }
//         }))
//     },
//     meta: {
//         current_page: pageNumber,
//         total: products.length, // Total number of products (for the current query)
//         query_params: {
//             sort,
//             page: pageNumber
//         }
//     }
// };

res.status(200).json(FilterProducts)

})
module.exports={getFiltercategory}
