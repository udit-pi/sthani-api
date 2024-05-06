


const Product = require('../../models/product.model');

exports.products=async(product_id, query)=>{


    const product = await Product.findById(product_id)
if(!product)







return product



    
}













