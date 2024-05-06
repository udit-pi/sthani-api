const { products } = require("../../services/store/product.service");
const catchAsync = require("../../utils/catchAsync");

const pick = require("../../utils/pick");




const getProducts=catchAsync(async(req,res)=>{



    const query = pick(req.query, ['sort', 'page']);
    const { product_id } = req.params
    const { sort } = query;
   
    const data = await products(product_id, query)

    res.status(200).json(data)

})

module.exports={
    getProducts
}
