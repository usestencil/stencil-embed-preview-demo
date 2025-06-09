import React from 'react';
import ProductForm from './ProductForm';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Stencil Embed Preview Demo
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 items-start justify-center">
          <ProductForm />
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Live Preview</h3>
            <iframe 
              id="template-preview" 
              src="http://app.usestencil.test:4000/live-preview/8be62eca-72de-4f81-9edc-a4dbeee6986f?token=SwabMCNLfDSaA7PoBdPbvj" 
              width="400" 
              height="400"
              className="border border-gray-200 rounded-lg"
              title="Stencil Template Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;