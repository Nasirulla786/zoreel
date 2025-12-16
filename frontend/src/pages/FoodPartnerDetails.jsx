import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverURL } from '../App'
import { useParams, useNavigate } from 'react-router-dom'
import './FoodPartnerDetails.css'

const FoodPartnerDetails = () => {
  const { foodpartner } = useParams()
  const navigate = useNavigate()
  const [partner, setPartner] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getfoodpartner = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `${serverURL}/api/foodpartner/getfoodpartnerdetails/${foodpartner}`,
          { withCredentials: true }
        )

        console.log("food partner details page", res.data)
        setPartner(res.data)
        setItems(res.data.items || [])
        setError(null)
      } catch (error) {
        console.log("get food partner error", error)
        setError("Failed to load food partner details")
      } finally {
        setLoading(false)
      }
    }

    getfoodpartner()
  }, [foodpartner])

  if (loading) {
    return (
      <div className="details-loading">
        <div className="loading-spinner"></div>
        <p>Loading partner details...</p>
      </div>
    )
  }

  if (error || !partner) {
    return (
      <div className="details-error">
        <h2>❌ {error || 'Partner not found'}</h2>
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="food-partner-details">
      {/* Header */}
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1>Partner Profile</h1>
      </div>

      {/* Main Content */}
      <div className="details-container">
        {/* Partner Info Card */}
        <div className="partner-card">
          <div className="header-banner">
            <div className="avatar">
              {partner.businessName?.charAt(0).toUpperCase() || '🍔'}
            </div>
          </div>

          <div className="partner-info">
            <h1 className="business-name">{partner.businessName}</h1>
            <p className="location">📍 {partner.location}</p>

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{partner.totalItems || 0}</div>
                <div className="stat-label">Items Uploaded</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{partner.outlets || 0}</div>
                <div className="stat-label">Outlets</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{partner.visits || 0}</div>
                <div className="stat-label">Total Visits</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{partner.rating || '0'}</div>
                <div className="stat-label">⭐ Rating</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="contact-section">
              <h3>📞 Contact Information</h3>
              <div className="contact-grid">
                <div className="contact-item">
                  <span className="label">Email:</span>
                  <span className="value">{partner.email}</span>
                </div>
                <div className="contact-item">
                  <span className="label">Phone:</span>
                  <span className="value">{partner.phone}</span>
                </div>
                <div className="contact-item">
                  <span className="label">Member Since:</span>
                  <span className="value">
                    {new Date(partner.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="items-section">
          <h2>🍽️ Menu Items ({items.length})</h2>

          {items.length === 0 ? (
            <div className="empty-state">
              <p>No items uploaded yet</p>
            </div>
          ) : (
            <div className="items-grid">
              {items.map((item) => (
                <div key={item._id} className="item-card">
                  <div className="item-video">
                    <video
                      src={item.video}
                      controls
                      poster={item.thumbnail}
                      className="video-player"
                    />
                  </div>
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">
                      {item.description || 'No description provided'}
                    </p>
                    <div className="item-stats">
                      <span className="likes">❤️ {item.like?.length || 0}</span>
                      <span className="comments">💬 {item.comment?.length || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodPartnerDetails
