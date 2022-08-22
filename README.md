# primer_deploy_APIRest

Mi primer deploy de una APIRest, usando NodeJs y Express

* Librerias usadas: [Boom](https://www.npmjs.com/package/@hapi/boom?ref=hackernoon.com), [cors](https://www.npmjs.com/package/cors), [faker](https://www.npmjs.com/package/faker/v/5.5.3), [joi](https://joi.dev/).
* Deploy hecho en Heroku. Si gustas, puedes verlo [aquí](https://apirest-products-csrehel.herokuapp.com/products) 👀✨

## Consultas con insomnia/Postman

Esta API consume la libreria Faker para llenar un arreglo aleatorio de 10 productos. Cada producto consta de los atributos `id`, `name`, `price` y `image`. Se puede hacer get, post, patch y delete de un producto.

### Obtener todos los productos

Puede obtener todos los productos en la ruta /products <br>

```
https://apirest-products-csrehel.herokuapp.com/products
```

### Obtener un producto

Puede obtener un solo producto especificando el Id en la ruta /products/:id

```
https://apirest-products-csrehel.herokuapp.com/products/id_del_producto
```

Tenga en consideranción que cada producto posee el atributo `isBlock`. 
Si este es `true` e intenta hacer la petición, se lanzara una excepción de conflicto (409) con el siguiente mensaje:

```
  {
    "statusCode": 409,
    "error": "Conflict",
    "message": "product is block"
  }
```

### Actualizar un producto

Para actualizar un producto, se requiere el id del producto en la ruta /products/:id y los atributos con su respectivo cambio en formato JSON. <br>
Considere que al tratarse de PATCH, es opcional poner todos los atributos del producto.

```
https://apirest-products-csrehel.herokuapp.com/products/id_del_producto

{
	"name": "nuevo nombre",
	"price": 550
}

```

Tenga en cuenta que el precio no puede ser inferior a 10. Si intenta actualizar el precio con un monto menor, se lanzara una excepción Bad Request (400) 
y se mostrara el siguiente mensaje:

```
{
	"statusCode": 400,
	"error": "Bad Request",
	"message": "\"price\" must be greater than or equal to 10"
}
```

### Eliminar un producto

Puede eliminar un producto en la ruta /products/:id <br>
Si la peticion ha salido bien, se mostrara el id del producto eliminado en formato JSON.

```
https://apirest-products-csrehel.herokuapp.com/products/id_del_producto
```

### Producto no encontrado

Si intenta hacer una petición de un producto que no existe, se enviara el siguiente mensaje:

```
{
	"statusCode": 404,
	"error": "Not Found",
	"message": "Product not found"
}
```







