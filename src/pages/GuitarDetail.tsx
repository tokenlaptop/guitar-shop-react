import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Guitar } from '../types/guitar';
import { guitarService } from '../services/api';

export const GuitarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [guitar, setGuitar] = useState<Guitar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      guitarService
        .getById(Number(id))
        .then(setGuitar)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p>Loading guitar details...</p>;
  if (!guitar) return <p>Guitar not found (404).</p>; 

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">← Back to Inventory</Link>
      <h2>{guitar.model} ({guitar.year})</h2>
      <p><strong>Price:</strong> ${guitar.price}</p>
      <p><strong>Size:</strong> {guitar.size}</p>
      <p><strong>Condition:</strong> {guitar.condition}</p>
      <p><strong>Status:</strong> {guitar.isSold ? 'Sold' : 'Available'}</p>
      <p><strong>Description:</strong> {guitar.description || 'No description provided.'}</p>
    </div>
  );
};