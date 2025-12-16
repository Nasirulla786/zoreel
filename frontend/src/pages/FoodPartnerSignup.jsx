import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import axios from "axios"
import { serverURL } from '../App'

const FoodPartnerSignup = () => {
  const navigate = useNavigate();


  const handleSubmit= async(e)=>{
    try {

      e.preventDefault();
      const businessName = e.target.business.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const location = e.target.location.value;
      const phone =e.target.phone.value;
      const outlets = e.target.outlets.value;

      const res = await axios.post(`${serverURL}/api/foodpartner/foodpartnerregister`,{businessName,email,password , location , phone , outlets},{withCredentials:true});

      // console.log(res);



      navigate("/addfood")

    } catch (error) {
      console.log("foodpartner signup error",error)

    }
  }
  return (
    <div className="signup-page food-part">
      <div className="signup-card" role="region" aria-label="Food partner signup form">
        <div className="brand">
          <h2>Partner Sign up</h2>
        </div>

        <div className="tabs" role="tablist">
          <Link to="/foodpartnerlogin" className="tab">Login</Link>
          <div className="tab active" aria-current="page">Signup</div>
        </div>

        <form className="form-row" noValidate onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="business">Business name</label>
            <input id="business" name="business" placeholder="Your business name" />
          </div>

          <div className="input">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="contact@business.com" />
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Create a password" />
          </div>

          <div className="input">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="text" placeholder="Your contact number" />
          </div>

          <div className="input">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" placeholder="Business location" />
          </div>

          <div className="input">
            <label htmlFor="outlets">Number of Outlets</label>
            <input id="outlets" name="outlets" type="number" placeholder="How many outlets" />
          </div>

          <div className="actions">
            <button className="primary-btn" type="submit">Create partner account</button>


            <div className="muted-center">

              Create Account for User? <Link to="/usersignup" className="secondary-link">Create</Link>

            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default FoodPartnerSignup
