const express=require("express");
const { registroUsuario } = require("../controllers/userController");
const router=express.Router();

router.route('/usuario/registro').post(registroUsuario)

module.exports=router