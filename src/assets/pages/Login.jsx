import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return setError("Please fill in all fields");
        }

        try {
            setError("");
            setLoading(true);
            const user = await loginUser({ email, password });
            console.log("Login successful:", user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/portal/dashboard");
        } catch (err) {
            setError("Failed to sign in. Please check your credentials.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form" style={{ margin: "100px auto", maxWidth: "400px", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", backgroundColor: "white" }}>
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Login</h1>
            {error && <div className="alert alert-error" style={{ color: "white", backgroundColor: "#e74c3c", padding: "10px", borderRadius: "5px", marginBottom: "20px" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                    />
                </div>
                <div className="form-actions" style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                    <Link to="/forgot-password" className="forgot-password" style={{ color: "#f26cf9", textDecoration: "none" }}>
                        Forgot password?
                    </Link>
                </div>
                <button
                    type="submit"
                    className="btn-primary"
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#f26cf9",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "16px"
                    }}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <div className="auth-footer" style={{ marginTop: "30px", textAlign: "center" }}>
                Don't have an account? <Link to="/signup" style={{ color: "#f26cf9", textDecoration: "none", fontWeight: "500" }}>Sign Up</Link>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Link to="/portal/dashboard" style={{ color: "#777", textDecoration: "none" }}>Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default Login;