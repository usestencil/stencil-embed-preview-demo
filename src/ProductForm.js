import React, { useState } from 'react';

const mockProducts = [
  { productId: 'PROD-001', price: '$29.99', link: 'https://example.com/product/001' },
  { productId: 'PROD-002', price: '$39.99', link: 'https://example.com/product/002' },
  { productId: 'PROD-003', price: '$19.99', link: 'https://example.com/product/003' },
  { productId: 'PROD-004', price: '$49.99', link: 'https://example.com/product/004' },
  { productId: 'PROD-005', price: '$24.99', link: 'https://example.com/product/005' },
  { productId: 'SHIRT-001', price: '$34.99', link: 'https://example.com/shirt/001' },
  { productId: 'SHIRT-002', price: '$44.99', link: 'https://example.com/shirt/002' },
  { productId: 'GADGET-001', price: '$99.99', link: 'https://example.com/gadget/001' },
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
        text: product.productId
      },
      {
        name: 'price',
        text: product.price
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