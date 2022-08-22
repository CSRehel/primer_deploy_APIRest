const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/products');
const validatorHandler = require('./../middleware/validator');
const Products = require('./../services/products');
const express = require('express');
const router = express.Router();
const service = new Products();

//trae producto especifico
router.get('/:id', validatorHandler(getProductSchema, 'params'), async(req, res, next) => {
    try {
        const { id } = req.params;
        const product = await service.findOne(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
})

//trae todos los productos
router.get('/', async(req, res) => {
    const products = await service.find();
    res.json(products);
})

//crea un producto
router.post('/', validatorHandler(createProductSchema, 'body'), async(req, res) => {
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json(product);
})

//actualiza un producto
router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const product = await service.update(id, body);
            res.json(product);
        } catch (error) {
            next(error);
        }
})

//eliminar un producto
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
})

module.exports = router;