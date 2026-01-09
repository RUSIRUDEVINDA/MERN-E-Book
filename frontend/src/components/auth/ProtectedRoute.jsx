import React from "react";

const ProtectedRoute = (children) => {
    const isAuthenticated = false; // Replace with actual authentication logic
    const loading = false; 
    const loccation = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }      
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: loccation }} replace />;
    }
    return children;
}

export default ProtectedRoute;