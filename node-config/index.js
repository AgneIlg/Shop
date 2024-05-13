const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock data
let toyShops = [
    { id: 1, name: 'Toy World', location: 'New York' },
    { id: 2, name: 'Fun Zone', location: 'Los Angeles' },
    { id: 3, name: 'Play Palace', location: 'Chicago' },
    { id: 4, name: 'Toyland', location: 'Houston' },
    { id: 5, name: 'Joyful Toys', location: 'Miami' }
];

let toys = [
    { id: 1, name: 'Teddy Bear', price: 15.99, shopId: 1 },
    { id: 2, name: 'LEGO Set', price: 29.99, shopId: 2 },
    { id: 3, name: 'Barbie Doll', price: 12.99, shopId: 3 },
    { id: 4, name: 'Remote Control Car', price: 24.99, shopId: 4 },
    { id: 5, name: 'Board Game', price: 19.99, shopId: 5 }
];

// Get all toy shops
app.get('/toyshops', (req, res) => {
    res.json(toyShops);
});

// Get toy shop by ID
app.get('/toyshops/:id', (req, res) => {
    const shop = toyShops.find(shop => shop.id === parseInt(req.params.id));
    if (!shop) return res.status(404).send('Toy shop not found.');
    res.json(shop);
});

// Get all toys
app.get('/toys', (req, res) => {
    res.json(toys);
});

// Get toys by shop ID
app.get('/toys/:shopId', (req, res) => {
    const shopToys = toys.filter(toy => toy.shopId === parseInt(req.params.shopId));
    if (shopToys.length === 0) return res.status(404).send('Toys not found for this shop.');
    res.json(shopToys);
});

// Add a new toy shop
app.post('/toyshops', (req, res) => {
    const newShop = req.body;
    toyShops.push(newShop);
    res.status(201).json(newShop);
});

// Add a new toy
app.post('/toys', (req, res) => {
    const newToy = req.body;
    toys.push(newToy);
    res.status(201).json(newToy);
});

// Update a toy shop by ID
app.put('/toyshops/:id', (req, res) => {
    const shopId = parseInt(req.params.id);
    const updatedShop = req.body;
    const index = toyShops.findIndex(shop => shop.id === shopId);
    if (index === -1) return res.status(404).send('Toy shop not found.');
    toyShops[index] = { ...toyShops[index], ...updatedShop };
    res.json(toyShops[index]);
});

// Delete a toy shop by ID
app.delete('/toyshops/:id', (req, res) => {
    const shopId = parseInt(req.params.id);
    const index = toyShops.findIndex(shop => shop.id === shopId);
    if (index === -1) return res.status(404).send('Toy shop not found.');
    toyShops.splice(index, 1);
    res.sendStatus(204);
});

// Update a toy by ID
app.put('/toys/:id', (req, res) => {
    const toyId = parseInt(req.params.id);
    const updatedToy = req.body;
    const index = toys.findIndex(toy => toy.id === toyId);
    if (index === -1) return res.status(404).send('Toy not found.');
    toys[index] = { ...toys[index], ...updatedToy };
    res.json(toys[index]);
});

// Delete a toy by ID
app.delete('/toys/:id', (req, res) => {
    const toyId = parseInt(req.params.id);
    const index = toys.findIndex(toy => toy.id === toyId);
    if (index === -1) return res.status(404).send('Toy not found.');
    toys.splice(index, 1);
    res.sendStatus(204);
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
