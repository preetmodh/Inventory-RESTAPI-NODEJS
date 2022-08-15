const mongoose = require('mongoose');
const Product = require('../models/product');

//controller for product get all
exports.products_get_all = (req,res,next)=>{
    Product.find().select('name price _id productImage').exec()
    .then(products => {
        const response = {
            count: products.length,
            products: products.map(product => {
                return {
                    name: product.name,
                    price: product.price,
                    _id: product._id,
                    productImage: product.productImage,
                    requests :{
                        type: 'GET',
                        url: 'http://localhost:3000/products/'+product._id
                    }
                }
            }) 
        };
            res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    } )
}

//controller for product create
exports.products_create_product = (req,res,next)=>{
    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    newProduct.save().then(result=>{
        res.status(201).json({
            message: 'Created product succussfully!',
            createdProduct: {
                _id: result._id,
                name: result.name,
                price: result.price,
                requests: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/'+result._id
                }
            },
        })
    }).catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

//controller for product get by id
exports.products_get_product = (req,res,next)=>{
    const id = req.params.productId;

    Product.findById(id)
        .select('name price _id productImage').exec()
        .then(product=>{
            if (product){
                res.status(200).json({
                    product: product,
                    requests:{
                        type: 'GET',
                        url: 'http://localhost:3000/products'
                    }
                })
            }
            else{
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                })
            }
        }).catch(err=> {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}

//controller for product update
exports.products_update_product = (req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    //Product.updateOne({_id: id }, {$set: {name: req.body.newName,price:req.body.newPrice}}).exec()
    Product.update({_id: id}, {$set: updateOps}).exec()
    .then(result=>{
        res.status(200).json({
            message: 'Product updated',
            request:{
                type: 'GET',
                url: 'http://localhost:3000/products/'+id
            }
        })
    }).catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
}

//controller for product delete
exports.products_delete_product = (req,res,next)=>{
    Product.remove({_id: req.params.productId}).exec()
    .then(result=>{
        res.status(200).json({
            message: 'Product deleted',
            request:{
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: {name: 'String', price: 'Number'}
            }
        })
    }).catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    } );
}