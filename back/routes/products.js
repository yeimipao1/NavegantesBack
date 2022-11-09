const express=require("express")
const router=express.Router();

const {getProducts, newProduct} = require("../controllers/productsController")

router.route('/productos').get(getProducts)
router.route('/producto/nuevo').post(newProduct);//establecemos la ruta


module.exports=router;