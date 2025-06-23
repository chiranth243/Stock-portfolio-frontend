import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../http';
import { getCurrentUser } from '../utils/auth';

// Import our glorious new stylesheet
import './InvestModal.css';

const InvestModal = ({ isOpen, onClose }) => {
  // State from your request
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [quantity, setQuantity] = useState('');
  const user = getCurrentUser();
  const token = localStorage.getItem("token");

  // Additional state for better UX
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Effect to fetch assets when the modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchAssets = async () => {
        setIsLoading(true);
        setError('');
        try {
          const res = await axios.get(`${baseURL}assets`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setAssets(res.data.assets || []); 
        } catch (err) {
          console.error('Error fetching assets', err);
          setError('Failed to load assets. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchAssets();
    }
  }, [isOpen, token]); // Only depends on isOpen and token now

  // NEW: Effect to reset form state when the modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      // Small delay to allow closing animation to finish before reset
      setTimeout(() => {
        setSelectedAssetId('');
        setQuantity('');
        setError('');
      }, 300);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAssetId || !quantity || parseFloat(quantity) <= 0) {
        setError('Please select an asset and enter a valid quantity.');
        return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      await axios.post(
        `${baseURL}portfolio/create`,
        {
          user_id: user?.id,
          asset_id: selectedAssetId,
          quantity: parseFloat(quantity)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // In a real app, you'd probably show a success toast instead of an alert
      alert('Investment successful! Your portfolio has been updated.');
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }
  
  // Find the full asset object to display price info
  const currentAsset = assets.find(asset => asset.id === selectedAssetId);
  const potentialCost = currentAsset && quantity > 0 ? (currentAsset.price * quantity) : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* The new, stylish SVG close button */}
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="modal-header">
          <h2>Invest in a New Asset</h2>
        </div>

        <form onSubmit={handleSubmit} className="invest-form">
          <div className="form-group">
            <label htmlFor="asset-select">Choose Asset</label>
            <select
              id="asset-select"
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              required
            >
              <option value="" disabled>-- Select an Asset --</option>
              {assets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name} ({asset.symbol}) - ${asset.price?.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity-input">Quantity</label>
            <input
              id="quantity-input"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 10.5"
              step="any"
              min="0"
              required
            />
          </div>
          
          {potentialCost > 0 && (
            <div className="cost-preview">
                Estimated Cost: <span>${potentialCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="submit-button" disabled={isLoading || !selectedAssetId || !quantity}>
            {isLoading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestModal;