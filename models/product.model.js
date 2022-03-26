var db = require("../utils/db");
const TABLE_NAME_1 = "product";
const TABLE_NAME_2 = "product_detail";
const config = require("../config/default.json");

module.exports = {
  getAllProducts: () => {
    return db.load(`select * 
    FROM ${TABLE_NAME_1}
    `);
  },
  getAllProductDetail: (product_id) => {
    return db.load(`select * 
    FROM ${TABLE_NAME_2}
    INNER JOIN ${TABLE_NAME_1} ON product_detail.product_id = product.product_id
    INNER JOIN category ON category_id = product.category_id
    where product_id = ${product_id}
    `);
  },
  getProductById: (product_id) => {
    return db.load(`select * 
    FROM ${TABLE_NAME_1}
    WHERE product_id = ${product_id}
    `);
  },
  addProduct: (productInfo, callback) => {
    // return db.add(TABLE_NAME_1, productInfo);
    db.pool.query("insert into product set ?", productInfo, callback);
  },
  addProductDetail:  (productDetailInfo) => {
      return db.add(TABLE_NAME_2, productDetailInfo);
  },
  del: (product_id) => {
    db.del(TABLE_NAME_1, { product_id });
  },
  edit: (product_id, newProductInfo) => {
    return db.patch(TABLE_NAME_1, newProductInfo, {product_id});
  }

  ///test here
};
