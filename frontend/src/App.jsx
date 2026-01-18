import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
import EditorPage from "./pages/EditorPage";
import ViewBookPage from "./pages/ViewBookPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

<<<<<<< Updated upstream
        {/* Protected Routes */ }
        <Route 
          path='/dashboard/'
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}  
        />
        <Route 
          path='/editor/:bookId'
          element={<ProtectedRoute><EditorPage /></ProtectedRoute>}  
=======
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
>>>>>>> Stashed changes
        />
        <Route
          path="/editor/:bookId"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-book/:bookId"
          element={
            <ProtectedRoute>
              <ViewBookPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
