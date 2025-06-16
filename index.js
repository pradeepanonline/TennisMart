require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'tennismartsecret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample categories and products
const categories = [
  { id: 'balls', name: 'Tennis Balls' },
  { id: 'shoes', name: 'Shoes' },
  { id: 'rackets', name: 'Tennis Rackets' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'federer', name: 'Federer Collection' }
];

const products = [
  { id: 1, name: 'Wimbledon Official Ball', category: 'balls', price: 15, image: '/images/free-photo-of-tennis-balls.jpeg' },
  { id: 2, name: 'Pro Tennis Shoes', category: 'shoes', price: 120, image: '/images/shoes1.jpg' },
  { id: 3, name: 'Wimbledon Racket', category: 'rackets', price: 200, image: '/images/racket1.jpg' },
  { id: 4, name: 'Sweatband', category: 'accessories', price: 10, image: '/images/accessory1.jpg' },
  // Federer Collection
  { id: 5, name: 'Wilson Pro Staff RF97 Autograph', category: 'federer', price: 249, image: '/images/racket1.jpg', description: 'Roger Federer\'s signature racket. 97 sq in head size, 16x19 string pattern, 315g unstrung weight.' },
  { id: 6, name: 'Nike Zoom Vapor Pro', category: 'federer', price: 180, image: '/images/shoes1.jpg', description: 'Federer\'s signature tennis shoes. Lightweight, responsive, and designed for quick movements.' },
  { id: 7, name: 'Luxilon ALU Power Rough', category: 'federer', price: 25, image: '/images/accessory1.jpg', description: 'Federer\'s preferred string. 16L gauge, co-polyester, offers excellent control and spin.' },
  { id: 8, name: 'Wilson Pro Overgrip', category: 'federer', price: 8, image: '/images/accessory1.jpg', description: 'Federer\'s choice of overgrip. Provides excellent tack and comfort.' }
];

// Home route
app.get('/', (req, res) => {
  res.render('index', { categories, products });
});

// Category route
app.get('/category/:id', (req, res) => {
  const category = categories.find(c => c.id === req.params.id);
  const filteredProducts = products.filter(p => p.category === req.params.id);
  res.render('category', { category, products: filteredProducts });
});

// Cart route
app.get('/cart', (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});

// Add to cart
app.post('/cart/add', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id == productId);
  if (!product) return res.redirect('/');
  if (!req.session.cart) req.session.cart = [];
  req.session.cart.push(product);
  res.redirect('/cart');
});

// Checkout route
app.get('/checkout', (req, res) => {
  const cart = req.session.cart || [];
  res.render('checkout', { cart });
});

// Federer Collection route
app.get('/federer', (req, res) => {
  const federerProducts = products.filter(p => p.category === 'federer');
  res.render('federer', { 
    products: federerProducts
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`TennisMart server running on http://localhost:${PORT}`);
}); 