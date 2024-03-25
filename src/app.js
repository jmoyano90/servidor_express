const express = require('express');
const { ProductManager } = require('./ProductManager');

const app = express();
const PORT = 8080;


const productManager = new ProductManager(`${__dirname}/../assets/Productos.json`);


// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit; 
        let products;

        if (limit) {
            products = await productManager.getProducts();
            products = products.slice(0, limit); 
        } else {
            products = await productManager.getProducts();
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid); // Obtener el ID del producto como entero

    try {
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' + req.params.pid });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
