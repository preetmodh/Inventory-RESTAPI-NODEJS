const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/',(req,res,next)=>{
    Product.find().exec()
    .then(products => {
        console.log(products);
        // if (products.length >= 0) {
            res.status(200).json({
                message: 'products fetched',
                products: products
            });
        // } else {
        //     res.status(404).json({
        //         message: 'No products found'
        //     });
        // }
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    } )
});

router.post('/',(req,res,next)=>{
    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    newProduct.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: newProduct,
        })
    }).catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

   
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;

    Product.findById(id).exec()
                        .then(product=>{
                            console.log(product);
                            if (product){
                                res.status(200).json({
                                    message: 'Handling GET requests to /products/:productId',
                                    product: product
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
});

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    //Product.updateOne({_id: id }, {$set: {name: req.body.newName,price:req.body.newPrice}}).exec()
    Product.update({_id: id}, {$set: updateOps}).exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message: 'Product updated',
            result: result
        })
    }).catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    
});

router.delete('/:productId',(req,res,next)=>{
    Product.remove({_id: req.params.productId}).exec()
    .then(result=>{
        res.status(200).json({
            message: 'Product deleted',
            result: result
        })
    }).catch(err=> {
        console.log(err);
        res.status(500).json({
            error:err
        });
    } );
});

module.exports = router;