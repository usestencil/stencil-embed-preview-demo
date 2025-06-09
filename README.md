# Stencil Embed Preview Demo

A React application demonstrating Stencil's embeddable live preview integration with a product search form.

## Features

- **Product Search Form**: Type-ahead search with dropdown suggestions for product selection
- **Live Preview Integration**: Real-time updates to Stencil iframe using postMessage API
- **Responsive Design**: Mobile-friendly layout built with TailwindCSS
- **Product Data**: Mock product catalog with Unsplash images

## Tech Stack

- React 18
- Webpack 5 (custom configuration)
- Babel
- TailwindCSS
- PostCSS

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stencil-embed-preview-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## How It Works

### Product Search
- Type in the Product ID input field to see filtered product suggestions
- Click on any product from the dropdown to select it
- The form displays product ID, name, price, and a link to view the product image

### Stencil Integration
When a product is selected, the application sends modifications to the embedded Stencil iframe using the postMessage API:

```javascript
{
  namespace: 'stencil',
  action: 'preview_changes',
  data: [
    { name: 'product', text: 'Product Name' },
    { name: 'price', text: '$29.99' },
    { name: 'image', src: 'https://images.unsplash.com/...' }
  ]
}
```

### Mock Data
The application includes 8 sample products:
- Premium Widget
- Deluxe Gadget  
- Basic Tool
- Pro Equipment
- Standard Kit
- Cotton T-Shirt
- Premium Polo
- Smart Device

Each product includes:
- `productId`: Unique identifier for searching
- `product`: Display name sent to Stencil
- `price`: Product price
- `link`: Unsplash image URL

## Project Structure

```
src/
├── App.js              # Main application component
├── ProductForm.js      # Product search form with Stencil integration
├── index.js           # React entry point
└── index.css          # TailwindCSS imports

public/
└── index.html         # HTML template

webpack.config.js      # Webpack configuration
babel.config.js        # Babel configuration
tailwind.config.js     # TailwindCSS configuration
postcss.config.js      # PostCSS configuration
```

## Customization

### Adding Products
Edit the `mockProducts` array in `src/ProductForm.js`:

```javascript
const mockProducts = [
  { 
    productId: 'YOUR-ID', 
    product: 'Product Name', 
    price: '$XX.XX', 
    link: 'https://your-image-url.com' 
  },
  // ... more products
];
```

### Modifying Stencil Integration
Update the `sendModificationsToIframe` function in `src/ProductForm.js` to send different data to your Stencil template.

## License

MIT License