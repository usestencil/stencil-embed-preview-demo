import React, { useState } from 'react';

const mockProducts = [
  { productId: 'PROD-001', product: 'Premium Widget', price: '$29.99', link: 'https://images.unsplash.com/photo-1690743300330-d190ad8f97dc?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { productId: 'PROD-002', product: 'Deluxe Gadget', price: '$39.99', link: 'https://images.unsplash.com/photo-1571081607311-066958b1deba?q=80&w=3404&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { productId: 'PROD-003', product: 'Basic Tool', price: '$19.99', link: 'https://images.unsplash.com/photo-1726084396629-2175d5810dad?q=80&w=3328&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { productId: 'PROD-004', product: 'Pro Equipment', price: '$49.99', link: 'https://images.unsplash.com/photo-1616510843385-300875184960?q=80&w=3478&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { productId: 'PROD-005', product: 'Standard Kit', price: '$24.99', link: 'https://images.unsplash.com/photo-1607252766165-a63b986e70d6?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { productId: 'SHIRT-001', product: 'Cotton T-Shirt', price: '$34.99', link: 'https://images.unsplash.com/photo-1714317438040-0e8584215699?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { productId: 'SHIRT-002', product: 'Premium Polo', price: '$44.99', link: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { productId: 'GADGET-001', product: 'Smart Device', price: '$99.99', link: 'https://images.unsplash.com/photo-1729839206142-d03c98f921fd?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

function ProductForm() {
  const [productId, setProductId] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleProductIdChange = (e) => {
    const value = e.target.value;
    setProductId(value);

    if (value.length > 0) {
      const filtered = mockProducts.filter(product =>
        product.productId.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  };

  const sendModificationsToIframe = (product) => {
    const modifications = [
      {
        name: 'product',
        text: product.product
      },
      {
        name: 'price',
        text: product.price
      },
      {
        name: 'image',
        src: product.link
      }
    ];

    const message = {
      namespace: 'stencil',
      action: 'preview_changes',
      data: modifications
    };

    const iframe = document.getElementById('template-preview');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, '*');
    }
  };

  const handleProductSelect = (product) => {
    setProductId(product.productId);
    setShowDropdown(false);
    sendModificationsToIframe(product);
  };

  return (
    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Search</h2>
      <div className="relative">
        <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-2">
          Product ID:
        </label>
        <input
          id="productId"
          type="text"
          value={productId}
          onChange={handleProductIdChange}
          placeholder="Enter product ID..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900"
        />
        
        {showDropdown && filteredProducts.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 border-t-0 rounded-b-lg shadow-lg max-h-48 overflow-y-auto z-50">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                onClick={() => handleProductSelect(product)}
                className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="font-semibold text-gray-800">{product.productId}</div>
                <div className="text-sm text-gray-600">
                  {product.price} - <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">View</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductForm;
