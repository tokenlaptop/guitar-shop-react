import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Guitar } from '../types/guitar';
import { guitarService } from '../services/api';

export const AdminDashboard: React.FC = () => {
  const [guitars, setGuitars] = useState<Guitar[]>([]);

  const loadAllGuitars = () => {
    guitarService.getAll({ showSold: true }).then(setGuitars).catch(console.error);
  };

  useEffect(() => {
    loadAllGuitars();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await guitarService.delete(id); 
      loadAllGuitars();
    }
  };

  const handleToggleSold = async (guitar: Guitar) => {
    await guitarService.update(guitar.guitarId, { isSold: !guitar.isSold }); 
    loadAllGuitars();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛠️ Admin Inventory Management</h2>
      <Link to="/admin/new" style={{ display: 'inline-block', marginBottom: '15px' }}>+ Add New Guitar</Link>

      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Sold Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guitars.map((g) => (
            <tr key={g.guitarId}>
              <td>{g.guitarId}</td>
              <td>{g.model}</td>
              <td>{g.year}</td>
              <td>${g.price}</td>
              <td>
                <button onClick={() => handleToggleSold(g)}>
                  {g.isSold ? 'Mark Available' : 'Mark Sold'}
                </button>
              </td>
              <td>
                <Link to={`/admin/edit/${g.guitarId}`}>Edit</Link> |{' '}
                <button onClick={() => handleDelete(g.guitarId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};