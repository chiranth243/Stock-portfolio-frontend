import React, { useState, useEffect } from 'react';
import styles from './CreatePortfolio.module.css';
import axios from 'axios';
import baseURL from '../../http';

function CreatePortfolio({ token, userId }){
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    // Fetch asset list from backend
    const fetchAssets = async () => {
      try {
        const res = await axios.get(`${baseURL}assets`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAssets(res.data.assets);
      } catch (err) {
        console.error('Error fetching assets', err);
      }
    };

    fetchAssets();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${baseURL}portfolio/create`,
        {
          user_id: userId?.id,
          asset_id: selectedAsset,
          quantity: parseFloat(quantity)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Portfolio updated!');
      setSelectedAsset('');
      window.location.href = '/dashboard';
      setQuantity('');
    } catch (err) {
      alert('Error creating portfolio');
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Portfolio</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Asset:
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            required
          >
            <option value="">-- Select an asset --</option>
            {assets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name} ({asset.symbol})
              </option>
            ))}
          </select>
        </label>

        <label>
          Quantity:
          <input
            type="number"
            step="any"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePortfolio;
