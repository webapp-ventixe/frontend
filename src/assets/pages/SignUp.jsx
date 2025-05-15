import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validering
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        if (formData.password.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        try {
            setError("");
            setLoading(true);

            // Skapa användarobjekt för registrering
            const userData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                email: formData.email,
                passwordHash: formData.password // Obs: i en riktig app skulle hash göras på servern
            };

            const user = await registerUser(userData);
            console.log("Registration successful:", user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/portal/dashboard");
        } catch (err) {
            setError("Failed to create account");
            console.error("Registration error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form" style={{ margin: "100px auto", maxWidth: "500px", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", backgroundColor: "white" }}>
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Sign Up</h1>
            {error && <div className="alert alert-error" style={{ color: "white", backgroundColor: "#e74c3c", padding: "10px", borderRadius: "5px", marginBottom: "20px" }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                    <div className="form-group" style={{ flex: "1" }}>
                        <label htmlFor="firstName" style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                        />
                    </div>
                    <div className="form-group" style={{ flex: "1" }}>
                        <label htmlFor="lastName" style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                        />
                    </div>
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label htmlFor="username" style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
                    />
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
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>
            </form>
            <div className="auth-footer" style={{ marginTop: "30px", textAlign: "center" }}>
                Already have an account? <Link to="/login" style={{ color: "#f26cf9", textDecoration: "none", fontWeight: "500" }}>Log In</Link>
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Link to="/portal/dashboard" style={{ color: "#777", textDecoration: "none" }}>Back to Dashboard</Link>
            </div>
        </div>
    );
};

export default SignUp;