import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'
import axios from "axios";
import { serverURL } from '../App';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;

      const res = await axios.post(`${serverURL}/api/user/userlogin`, {
        email,password
      }, {withCredentials:true});

      if(res.status===200){
        navigate("/");
      }
    } catch (error) {
      console.log("user login error",error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-600 via-red-500 to-orange-400 flex items-center justify-center p-6">
      <div className="signup-card w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 text-white">

        {/* Brand */}
        <div className="brand text-center mb-6">
          <h2 className="text-3xl font-bold tracking-wide">Welcome Back</h2>
          <p className="text-sm text-gray-200 mt-2">Login to continue your journey</p>
        </div>

        {/* Tabs */}
        <div className="tabs flex justify-center gap-6 mb-6">
          <div className="tab active text-pink-400 font-semibold border-b-2 border-pink-400 pb-1">Login</div>
          <Link to="/usersignup" className="tab text-gray-300 hover:text-white transition">Signup</Link>
        </div>

        {/* Form */}
        <form className="form-row flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
          <div className="input flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="input flex flex-col gap-2">
            <div className="row-between flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Link to="#" className="small text-xs text-pink-300 hover:text-pink-400 transition">Forgot password?</Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Actions */}
          <div className="actions flex flex-col gap-4 mt-4">
            <button
              className="primary-btn w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 font-semibold text-lg shadow-lg transition"
              type="submit"
            >
              Login
            </button>
            <div className="muted-center text-center text-sm text-gray-300">
              Don't have an account?{" "}
              <Link to="/usersignup" className="secondary-link text-pink-400 hover:underline">Create account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
