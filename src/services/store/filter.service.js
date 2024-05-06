


exports.filters=(productsQuery, query = {}, filterData = {})=>{
  const pageSize = 10; // Number of products per page
  let pageNumber = 1;
const { sort,page} = query;
const {brand_ids,category_ids,price_min,price_max,search_keyword}=filterData
 
let sortedProducts = [...productsQuery];

const brandIdsSet = new Set(brand_ids);

// Filter products based on brand_ids
if (brandIdsSet.size > 0) {
    sortedProducts = sortedProducts.filter(product => brandIdsSet.has(product.brand_id.toString()));
}


if (price_min !== undefined && price_max !== undefined) sortedProducts = sortedProducts.filter(product => product.price >= price_min && product.price <= price_max);

//    //Sort the product according to price or created date 

if (sort) {
    switch (sort) {
        case 'new':
            sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'price_low_to_high':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price_high_to_low':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'discounted':
            sortedProducts.sort((a, b) => (b.discounted_price || 0) - (a.discounted_price || 0));
            break;
        default:
            break;
    }
}
 //Pagination 
 if (page) {
  pageNumber = parseInt(page);
}
if (pageSize) {
  const startIndex = (pageNumber - 1) * parseInt(pageSize);
  const endIndex = startIndex + parseInt(pageSize);
  sortedProducts = sortedProducts.slice(startIndex, endIndex);
}
    return {sortedProducts ,page:pageNumber}
}









//filter product category
// exports.filterProducts = async (category_id,query,filterData) => {

//   const {page } = query;
//   const pageSize = 10; // Number of products per page
//   let pageNumber = 1;
  
//   // Find the category by ID
//     const category = await Category.findById(category_id);
//     if (!category)throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');

//     let productsQuery = Product.find({ categories: category_id });



//     //filter the product according to filter
    
//    let FilterProducts=filters(productsQuery,query,filterData)
 
 
//      //Pagination 



//       if (page) {
//         pageNumber = parseInt(page);
//       }
//       FilterProducts = FilterProducts.skip((pageNumber - 1) * pageSize).limit(pageSize);

//       const products = await FilterProducts.exec();

//      //finnaly return to the controllers 
//     return { category, products, page: pageNumber};

// };



