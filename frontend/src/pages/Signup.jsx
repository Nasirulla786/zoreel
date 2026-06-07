import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import axios from "axios";
import { serverURL } from '../App';

const Signup = () => {
  const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    try {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      const res  = await axios.post(`${serverURL}/api/user/userregister`, {
        name,
        email,
        password
      }, {withCredentials:true});
      if(res){
        navigate("/");
      }

    } catch (error) {
      console.log("User signup error", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-600 via-red-500 to-orange-400 flex items-center justify-center p-6">
      <div className="signup-card" role="region" aria-label="Signup form">

        {/* Brand */}
        <div className="brand font-bold">
          <h2>Create Account</h2>
          <p className="small">Join the community and start exploring</p>
        </div>

        {/* Tabs */}
        <div className="tabs" role="tablist">
          <Link to="/userlogin" className="tab">Login</Link>
          <div className="tab active" aria-current="page">Signup</div>
        </div>

        {/* Form */}
        <form className="form-row" noValidate onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" placeholder="Enter your name" />
          </div>

          <div className="input">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="name@company.com" />
          </div>

          <div className="input">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Create a password" />
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="primary-btn" type="submit">Create Account</button>
            <div className="muted-center">
              Create Account for Food Partner{" "}
              <Link to="/foodpartnersignup" className="secondary-link">Create Account</Link>.
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="footer-note">
          Already have an account?{" "}
          <Link to="/userlogin" className="secondary-link">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup;
