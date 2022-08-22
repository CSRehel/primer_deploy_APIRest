const faker = require('faker');
const boom = require('@hapi/boom');

class Products {

    constructor(){
        this.products = [];
        this.generate();
    }

    generate(){

        const limit = 10;

        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price()),
                Image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            })
        }

    }

    create(body){
        this.products.push({
            id: faker.datatype.uuid(),
            name: body.name,
            price: parseInt(body.price),
            Image: body.image
        })
    }

    find(){
        return this.products;
    }

    findOne(id){
        const product = this.products.find(item => item.id === id);
        if(!product){
            throw boom.notFound('Product not found');
        }
        if(product.isBlock){
            throw boom.conflict('product is block');
        }
        return product;
    }

    update(id, body){
        const index = this.products.findIndex(item => item.id === id);

        if (index === -1) {
            throw boom.notFound('Product not found');
        }

        this.products[index] = {
            ...this.products[index],
            ...body
        }

        return this.products[index]
    }

    delete(id){
        const index = this.products.find(item => item.id === id);
        console.log(index);
        if (index === -1) {
            throw new Error('product not found');
        }
        this.products.splice(index,1);
        return {id}
    }

}

module.exports = Products;