# TennisMart - Wimbledon Edition

A modern e-commerce website for tennis equipment, featuring a special Roger Federer collection. Built with Express.js and EJS templating.

## Features

- Responsive design with Wimbledon theme
- Dedicated Roger Federer collection page
- Product categories: Tennis Balls, Shoes, Rackets, Accessories
- Shopping cart functionality
- PayPal checkout integration
- High-quality product images

## Tech Stack

- Node.js
- Express.js
- EJS templating
- CSS3
- PayPal API

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/TennisMart.git
cd TennisMart
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your PayPal credentials:
```
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
```

4. Start the server:
```bash
node index.js
```

5. Visit `http://localhost:3000` in your browser

## Project Structure

```
TennisMart/
├── public/
│   ├── images/     # Product images
│   └── styles/     # CSS files
├── views/          # EJS templates
├── index.js        # Main application file
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 