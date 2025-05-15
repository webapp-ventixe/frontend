import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import CenterLayout from "./assets/layouts/CenterLayout";
import PortalLayout from "./assets/layouts/PortalLayout";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./assets/pages/Login";
import SignUp from "./assets/pages/SignUp";
import ForgotPassword from "./assets/pages/ForgotPassword";
import Events from "./assets/pages/Events";

function App() {
    return (
        <Routes>
            {/* Login and registration routes at root level */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Redirect root to dashboard */}
            <Route path="/" element={<Navigate to="/portal/dashboard" replace />} />

            <Route element={<CenterLayout />}>
                <Route path="/home" element={<Home />} />
            </Route>

            <Route path="/portal" element={<PortalLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="events" element={<Events />} />
            </Route>
        </Routes>
    );
}

export default App;