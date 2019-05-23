const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('../server/models/product.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/http_client', { useNewUrlParser: true });

var myLogger = function (req, res, next) {
    console.log(req.body);
    next();
}
app.use(myLogger);

app.get('/products', function (req, res) {
    Product.find().lean().exec(
        (error, prods) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(prods);
            }
        }
    );
});

app.get('/productserr', function (req, res) {
    setTimeout(
        () => {
            res.status(500).send({
                msg: "Error message from the server"
            });
        }, 2000);
});

app.get('/productsdelay', function (req, res) {
    setTimeout(
        () => {
            Product.find().lean().exec(
                (error, prods) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.status(200).send(prods);
                    }
                }
            );
        }, 2000);
});

app.get('/products_ids', function (req, res) {
    Product.find().lean().exec(
        (error, prods) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send(prods.map(p => p._id));
            }
        }
    );
});


app.get('/products/name/:id', function (req, res) {
    const id = req.params.id
    Product.findById(id,
        (error, prod) => {
            if (error) {
                res.status(500).send(error);
            } else if (!prod) {
                res.status(404).send({});
            } else {
                res.status(200).send(prod.name);
            }
        }
    );
});


app.post('/products', function (req, res) {
    p = new Product({
        name: req.body.name,
        department: req.body.department,
        price: req.body.price
    });
    p.save((error, prod) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(201).send(prod);
        }
    });
});

app.delete('/products/:id', function (req, res) {
    const id = req.params.id
    Product.deleteOne({ _id: id },
        (error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).send({});
            }
        });
});

app.patch('/products/:id', function (req, res) {
    const id = req.params.id
    Product.findById(id,
        (error, prod) => {
            if (error) {
                res.status(500).send(error);
            } else if (!prod) {
                res.status(404).send({});
            } else {
                prod.name = req.body.name;
                prod.department = req.body.department;
                prod.price = req.body.price;
                prod.save((error, prod) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.status(200).send(prod);
                    }
                });
            }
        }
    );
});

app.listen(3000);
