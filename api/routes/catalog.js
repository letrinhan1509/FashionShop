var express = require('express');
var router = express.Router();
var modelCatalog = require('../models/model_catalog.js'); //nhúng model catalog vào controller này để sử dụng
var modelProduct = require('../models/model_product.js');
var message = '';

router.get('/:name', async function(req, res) {
  let name = req.params.name;
  let listPro = await modelCatalog.listByName(name);
  let listProPopular = await modelProduct.list();
  let listCat = await modelCatalog.list();
  let breadcrumb = name;
  res.render('site/san-pham-theo-loai', {listPro: listPro, listCat: listCat, listProPopular: listProPopular, breadcrumb});
})


      // API
  // Danh sách loại sản phẩm:
router.get('/api/catolog', async function(req, res) {
  let listPro = await modelCatalog.list();
  res.json(listPro);
})
  // Danh sách sản phẩm theo loại:
router.get('/api/loai-sp/:name', async function(req, res) {
  let name = req.params.name;
  console.log(name);
  let listPro = await modelCatalog.listByName(name);
  //console.log(listPro);
  res.json(listPro);
})



module.exports = router;