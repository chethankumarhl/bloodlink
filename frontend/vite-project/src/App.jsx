import { Button } from "@/components/ui/button"
import { Routes, Route, useLocation } from "react-router-dom"
import Header from "./mycomponents/Header"
import Home from "./pages/Home"
import Donate from "./pages/Donate"
import Donating from "./pages/Donating"
import Completed from "./pages/Completed"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Request from "./pages/Request"
import Footer from "./mycomponents/Footer"
import Profile from "./pages/Profile"
import AboutUs from "./pages/About"
import UpdatePassword from "./pages/UpdatePassword"
import BloodLinkChatbot from './mycomponents/ChatBot'
import UpdateProfile from "./pages/UpdateProfile"
import UserProfile from "./pages/UserProfile"
import MyRequests from "./pages/MyRequests"
import ErrorPage from "./pages/ErrorPage"
import PrivateRoute from "./mycomponents/PrivateRoute" // ✅ import added

function App() {
  const location = useLocation();
  
  const currentPath = location.pathname;
  const hideLayout = currentPath === '/Login' || currentPath === '/login' || currentPath === '/register';

  return (
    <div>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/donate" 
          element={
            <PrivateRoute><Donate /></PrivateRoute>
          } 
        />
        <Route 
          path="/donate/donating" 
          element={
            <PrivateRoute><Donating /></PrivateRoute>
          } 
        />
        <Route 
          path="/donate/completed" 
          element={
            <PrivateRoute><Completed /></PrivateRoute>
          } 
        />
        <Route 
          path="/myrequests" 
          element={
            <PrivateRoute><MyRequests /></PrivateRoute>
          } 
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/requests" 
          element={
            <PrivateRoute><Request /></PrivateRoute>
          } 
        />
        <Route path="/about" element={<AboutUs />} />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute><Profile /></PrivateRoute>
          } 
        />
        <Route 
          path="/profile/update" 
          element={
            <PrivateRoute><UpdateProfile /></PrivateRoute>
          } 
        />
                   <Route path="*" element={<ErrorPage/>} />

        <Route path="/userprofile/:id" element={<UserProfile />} />
        <Route 
          path="/updatepassword" 
          element={
            <PrivateRoute><UpdatePassword /></PrivateRoute>
          } 
        />
      </Routes>
      {!hideLayout && <BloodLinkChatbot />}
      {!hideLayout && <Footer />}
    </div>
  )
}

export default App
