import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import axios from "axios"
import { serverURL } from '../App'

const FoodPartnerSignup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    try {
      e.preventDefault();
      setError("");
      const businessName = e.target.business.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const location = e.target.location.value;
      const phone = e.target.phone.value;
      const outlets = e.target.outlets.value;

      const res = await axios.post(
        `${serverURL}/api/foodpartner/foodpartnerregister`,
        { businessName, email, password, location, phone, outlets },
        { withCredentials:true }
      );

      navigate("/addfood");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.");
      console.log("foodpartner signup error", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-600 via-red-500 to-orange-400 flex items-center justify-center p-6">
      <div className="signup-card " role="region" aria-label="Food partner signup form">

        {/* Brand */}
        <div className="brand">
          <h2>Partner Sign Up</h2>
          <p className="small">Grow your business with us</p>
        </div>

        {/* Tabs */}
        <div className="tabs" role="tablist">
          <Link to="/foodpartnerlogin" className="tab">Login</Link>
          <div className="tab active" aria-current="page">Signup</div>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-200/70 bg-rose-500/10 px-4 py-3 text-rose-100">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="form-" noValidate onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="business">Business name</label>
            <input autoComplete="organization" id="business" name="business" placeholder="Your business name" />
          </div>

          <div className="input">
            <label htmlFor="email">Email address</label>
            <input autoComplete="email" id="email" name="email" type="email" placeholder="contact@business.com" />
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>
            <input autoComplete="new-password" id="password" name="password" type="password" placeholder="Create a password" />
          </div>

          <div className="input">
            <label htmlFor="phone">Phone number</label>
            <input autoComplete="tel" id="phone" name="phone" type="text" placeholder="Your contact number" />
          </div>

          <div className="input">
            <label htmlFor="location">Location</label>
            <input autoComplete="street-address" id="location" name="location" placeholder="Business location" />
          </div>

          <div className="input">
            <label htmlFor="outlets">Number of Outlets</label>
            <input autoComplete="off" id="outlets" name="outlets" type="number" placeholder="How many outlets" />
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="primary-btn" type="submit">Create Partner Account</button>
            <div className="muted-center">
              Create Account for User?{" "}
              <Link to="/usersignup" className="secondary-link">Create</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerSignup;
