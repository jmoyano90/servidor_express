const fs = require('fs');

const filename = '${__dirname}/../assets/Productos.json';

class ProductManager {
    static #ultimoId = 1;

    constructor(filename) {
        this.filename = filename;
    }

    #getNuevoId() {
        const id = ProductManager.#ultimoId;
        ProductManager.#ultimoId++;
        return id;
    }

    async addProduct(product) {
        try {
            const products = await this.getProductsFromFile();
            const newProduct = {
                id: this.#getNuevoId(),
                ...product
            };
            products.push(newProduct);
            await this.writeProductsToFile(products);
            return newProduct;
        } catch (error) {
            console.error('Error adding product:', error);
            return null;
        }
    }

    async getProducts() {
        try {
            const products = await this.getProductsFromFile();
            return products;
        } catch (error) {
            console.error('Error getting products:', error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProductsFromFile();
            const product = products.find(product => product.id === id);
            if (!product) {
                console.error('Error: Product not found');
                return null;
            }
            return product;
        } catch (error) {
            console.error('Error getting product by id:', error);
            return null;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProductsFromFile();
            const index = products.findIndex(product => product.id === id);
            if (index === -1) {
                console.error('Error: Product not found');
                return null;
            }
            products[index] = { ...products[index], ...updatedFields };
            await this.writeProductsToFile(products);
            return products[index];
        } catch (error) {
            console.error('Error updating product:', error);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getProductsFromFile();
            products = products.filter(product => product.id !== id);
            await this.writeProductsToFile(products);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    async getProductsFromFile() {
        try {
            const data = fs.readFileSync(this.filename, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                console.error('Error reading file:', error);
                return [];
            }
        }
    }

    async writeProductsToFile(products) {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    }
}

// Generar el archivo productos.json

const productos = [
    {
        id: 1,
        title: 'Producto 1',
        description: 'Descripción del Producto 1',
        price: 100,
        thumbnail: 'imagen1.jpg',
        code: 'abc123',
        stock: 10
    },
    {
        id: 2,
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 200,
        thumbnail: 'imagen2.jpg',
        code: 'def456',
        stock: 20
    },
    {
        id: 3,
        title: 'Producto 3',
        description: 'Descripción del Producto 3',
        price: 150,
        thumbnail: 'imagen3.jpg',
        code: 'ghi789',
        stock: 15
    },
    {
        id: 4,
        title: 'Producto 4',
        description: 'Descripción del Producto 4',
        price: 120,
        thumbnail: 'imagen4.jpg',
        code: 'jkl012',
        stock: 12
    },
    {
        id: 5,
        title: 'Producto 5',
        description: 'Descripción del Producto 5',
        price: 180,
        thumbnail: 'imagen5.jpg',
        code: 'mno345',
        stock: 18
    },
    {
        id: 6,
        title: 'Producto 6',
        description: 'Descripción del Producto 6',
        price: 250,
        thumbnail: 'imagen6.jpg',
        code: 'pqr678',
        stock: 25
    },
    {
        id: 7,
        title: 'Producto 7',
        description: 'Descripción del Producto 7',
        price: 300,
        thumbnail: 'imagen7.jpg',
        code: 'stu901',
        stock: 30
    },
    {
        id: 8,
        title: 'Producto 8',
        description: 'Descripción del Producto 8',
        price: 80,
        thumbnail: 'imagen8.jpg',
        code: 'vwx234',
        stock: 8
    },
    {
        id: 9,
        title: 'Producto 9',
        description: 'Descripción del Producto 9',
        price: 160,
        thumbnail: 'imagen9.jpg',
        code: 'yz0123',
        stock: 16
    },
    {
        id: 10,
        title: 'Producto 10',
        description: 'Descripción del Producto 10',
        price: 220,
        thumbnail: 'imagen10.jpg',
        code: '456abc',
        stock: 22
    }
];

try {
    fs.writeFileSync(filename, JSON.stringify(productos, null, 2));
    console.log('Se ha generado el archivo productos.json');
} catch (error) {
    console.error('Error al generar el archivo productos.json:', error);
}

module.exports = { ProductManager }
