import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import axios from "axios"
import { serverURL } from '../App'

const FoodPartnerLogin = () => {

  const navigate  = useNavigate();

    const handleSubmit= async(e)=>{
    try {

      e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;

      const res = await axios.post(`${serverURL}/api/foodpartner/foodpartnerlogin`,{email,password},{withCredentials:true});

    if(res){
      navigate("/addfood")
    }


    } catch (error) {
      console.log("foodpartner login error",error)

    }
  }
  return (
    <div className="signup-page food-part">
      <div className="signup-card" role="region" aria-label="Food partner login form">
        <div className="brand">
          <h2>Partner Login</h2>
        </div>

        <div className="tabs" role="tablist">
          <div className="tab active" aria-current="page">Login</div>
          <Link to="/foodpartnersignup" className="tab">Signup</Link>
        </div>

        <form className="form-row" noValidate onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="contact@business.com" />
          </div>

          <div className="input">
            <div className="row-between">
              <label htmlFor="password">Password</label>
            </div>
            <input id="password" name="password" type="password" placeholder="Your password" />
          </div>

          <div className="actions">
            <button className="primary-btn" type="submit">Login</button>
            <div className="muted-center">
              Don't have a partner account? <Link to="/foodpartnersignup" className="secondary-link">Create account</Link>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}

export default FoodPartnerLogin
