import React, { useEffect, useState } from 'react'
import './HomeUI.css'
import Left from '../Components/Left'
import Middle from '../Components/Middle'
import Right from '../Components/Right'
import axios from "axios"
import { serverURL } from '../App'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await axios.get(
          `${serverURL}/api/user/getallfoods`,
          { withCredentials: true }
        );

        setData(res.data.data || []);
        setUserData(res.data.user || [])

        // console.log("this is response",res.data.user);
      } catch (error) {
        console.error("Fetch reels error:", error);
        setData([]);

      }
    };

    fetchReels();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${serverURL}/api/user/logout`, {}, { withCredentials: true });
      navigate('/userlogin');
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };




  return (
    <div className="mvp-app bg-black overflow-auto  ">
      <div className="mvp-grid ">
        <div className="mvp-col mvp-left">
          <Left reel={userData} />
        </div>

        <div className="mvp-col mvp-center">
          <Middle reel={data} />
        </div>

        <div className="mvp-col mvp-right">
          <Right reel={data}/>
        </div>
      </div>

      <nav className="bottom-nav-mobile">
        <button className="bn" onClick={() => window.location.href = '/'} title="Home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </button>

        <div className="search-input-mobile">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-mobile-input"
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>

        <button className="bn" onClick={handleLogout} title="Logout">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        </button>
      </nav>
    </div>
  )
}

export default Home
