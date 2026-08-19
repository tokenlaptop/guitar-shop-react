import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Guitar, Brand } from '../types/guitar';
import { guitarService } from '../services/api';

export const GuitarList: React.FC = () => {
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('price_asc');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    guitarService.getBrands().then(setBrands).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    guitarService
      .getAll({
        brandId: selectedBrand || undefined,
        size: selectedSize || undefined,
        sort: sortOrder,
        showSold: false, // Visitors don't see sold guitars
      })
      .then((data) => setGuitars(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedBrand, selectedSize, sortOrder]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎸 Guitar Inventory</h2>

      {/* Filter and Sort Controls */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b.brandId} value={b.brandId}>{b.name}</option>
          ))}
        </select>

        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">All Sizes</option>
          <option value="Full">Full</option>
          <option value="7/8">7/8</option>
          <option value="3/4">3/4</option>
          <option value="1/2">1/2</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {guitars.map((guitar) => (
            <div key={guitar.guitarId} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px' }}>
              <h3>{guitar.model} ({guitar.year})</h3>
              <p><strong>Price:</strong> ${guitar.price}</p>
              <p><strong>Size:</strong> {guitar.size} | <strong>Condition:</strong> {guitar.condition}</p>
              <Link to={`/guitars/${guitar.guitarId}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};