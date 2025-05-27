import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import PortalLayout from "./assets/layouts/PortalLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./assets/pages/Login";
import SignUp from "./assets/pages/SignUp";
import Events from "./assets/pages/Events";

function App() {
    return (
        <Routes>
            {/* Login and registration routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/portal/dashboard" replace />} />

            <Route path="/portal" element={<PortalLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="events" element={<Events />} />
            </Route>
        </Routes>
    );
}

export default App;