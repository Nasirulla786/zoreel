import React from 'react'
import { Routes  , Route} from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import FoodPartnerSignup from '../pages/FoodPartnerSignup'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import Home from '../pages/Home'
import AddFoodPage from '../pages/AddFoodPage'
import ProtectedRoute from '../Components/ProtectedRoute'
import Porfile from '../pages/Porfile'
import SaveReel from '../pages/SaveReel'
import FoodPartnerDetails from '../pages/FoodPartnerDetails'

const Routing = () => {
  return (
   <>
   <Routes >
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path = "/usersignup" element={<Signup />} />
    <Route path = "/userlogin" element={<Login />} />
    <Route path = "/foodpartnersignup" element={<FoodPartnerSignup />} />
    <Route path = "/foodpartnerlogin" element={<FoodPartnerLogin />} />
    <Route path = "/addfood" element={ <AddFoodPage />} />
    <Route path = "/profile/:profile" element={ <Porfile />} />
    <Route path = "/savereel" element={ <SaveReel />} />
    <Route path = "/foodpartnerdetail/:foodpartner" element={<FoodPartnerDetails />} />






   </Routes>

   </>
  )
}

export default Routing
