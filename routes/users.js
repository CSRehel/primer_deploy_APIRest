const express = require('express');
const router = express.Router();
var faker = require('faker');

//traer la cantidad especificada de usuarios
router.get('/', (req, res) => {

    const { size } = req.query;
    const limit = size || 10;
    const users = []

    for (let i = 0; i < limit; i++) {
        users.push({
            name: faker.name.findName(),
            Image: faker.image.image()
        })
    }

    res.json(users);
})

module.exports = router