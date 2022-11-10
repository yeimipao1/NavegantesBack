const { json } = require("express");
const producto=require("../models/productos")
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url));// usurpación de required

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
// Update un producto
exports.updateProduct=async(req, res, next) =>{
    let product= await producto.findById(req.params.id)// variable de tipo modificabe
    if(!product){//verifico que el objeto no existe para finalizar el proceso
        return res.status(404).json({
            success:false,
            message: "No encontramos ese producto"
        })
    }
    //Si el producto si existe, entonces si ejecuto la actualizción
    product= await producto.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    });
    //Respondo ok si el producto si se actualizó
    res.status(200).json({
        success:true,
        message:"Producto actualizado correctamente",
        product
    })
    
}
//Eliminar un producto
exports.deleteProduct=async(req,res,next)=>{
    const product= await producto.findById(req.params.id)// variable de tipo modificabe
    if(!product){//verifico que el objeto no existe para finalizar el proceso
        return res.status(404).json({ //si el objeto no exite, retun termina el metodo
            success:false,
            message: "No encontramos ese producto"
        })

    }
    await product.remove();//Eliminamos el proceso
    res.status(200).json({
        success:true,
        message:"Producto eliminado correctamente"
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


//hablemos fetch
//ver todos los productos
function verProductos(){
    fetch('http://localhost:4000/api/productos')
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}
//verProductos(); llamamos al metodo creado para probar la consulta
// ver por id
function verProductosPorId(id){
    fetch('http://localhost:4000/api/producto/'+id)
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.error(err))
}
//verProductosPorId('636c3d09e47b935c7f27ce12'); probamos el metodo con id :)
