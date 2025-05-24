import Product from "../models/product.js"; 
import Cart from "../models/cart.js";


export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const createProduct = async (req,res) =>{
    const product = req.body;
    try{
        const newProduct =  await Product.create(product);
        res.status(201).json(newProduct);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const deleteProduct = async (req,res) =>{
    const productId = req.params.id;
    try{
        const deletedProduct =  await Product.deleteOne({_id:productId});
        res.status(201).json(deletedProduct);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export const updateProduct = async (req,res) => {
    const product = req.body;
    const productId = req.params.id;
    try {
        const updatedProduct = await Product.updateOne(
            {_id:productId}, 
            {$set:product}, 
        );
        res.status(201).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

