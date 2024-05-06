const express = require('express');

const authRoute = require('./authRoute');
const productRoute = require('./productRoute');
const categoryRoute=require("./categoryRoute")
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [

 
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/product',
    route: productRoute
  },

  {
    path: '/category',
    route: categoryRoute
  }

  
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});



module.exports = router;
