const User = require("../models/user")
const ErrorHandler= require("../utils/erroHandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors")

//Registrar nuevo usuario/api/usuario/registro

exports.registroUsuario= catchAsyncErrors(async(req, res, next)=>{
    const{nombre, email, password}= req.body;

    const user = await User.create({
        nombre,
        email,
        password,
        avatar:{
            public_id: "rererhhthjty9jtyutyuiiky",
            url:"https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png"
        }
        
    })
    res.status(201).json({
        success:true,
        user
    })
})