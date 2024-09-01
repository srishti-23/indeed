import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CompanyReviews from "./pages/CompanyReviews";
import SalaryGuide from "./pages/SalaryGuide";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Bookmark from "./components/Bookmark";
import Notification from "./pages/Notification";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Define routes where Header and Footer should not be displayed
  const noHeaderFooterRoutes = ["/signup", "/login"];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companyReviews" element={<CompanyReviews />} />
        <Route path="/salaryGuide" element={<SalaryGuide />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

export default App;
