const { json } = require("express");
const producto=require("../models/productos")

//Ver la lista de productos
exports.getProducts=async(req,res,next) => {
    const productos=await producto.find();
    res.status(200).json({
        success: true,
        count: productos.length,
        productos
        
    })
}
//ver un producto por ID
exports.getProductById=async(req, res, next) =>{
    const product= await producto.findById(req.params.id)
    if(!product){
        return res.status(404).json({
            success:false,
            message: "No encontramos ese producto"
        })
    }
    res.status(200).json({
        success: true,
        message:"Aqui debajo encuentras información sobre tu producto:",
        product
        
    })
}  


//crear nuevo producto
exports.newProduct=async(req,res,next)=>{
    const product=await producto.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
}
