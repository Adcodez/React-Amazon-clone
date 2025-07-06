import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import useShoppingStore from "../context/useShoppingStore";
import useWishlistStore from "../context/useWishlistStore";
const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setUser = useShoppingStore((state) => state.setUser);

  const validateInputs = () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const signIn = async (e) => {
    e.preventDefault();
    console.log("✅ Sign-in function triggered");

    if (!validateInputs()) return;
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      useWishlistStore.getState().setUser(userCredential.user); // ✅ move here!
      navigate("/");
    } catch (err) {
      console.error("❌ Sign-in error:", err.code, err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user); // 👉 Zustand: update user state
      navigate("/");
    } catch (err) {
      console.error("❌ Registration error:", err.code, err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login_container">
        <h2>Sign-in</h2>
        <form onSubmit={signIn}>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              console.log("Typing in email field:", e.target.value); // Debugging log
              setEmail(e.target.value);
            }}
            disabled={loading}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              console.log("Typing in password field:", e.target.value); // Debugging log
              setPassword(e.target.value);
            }}
            disabled={loading}
          />
          {error && <div className="login_error">{error}</div>}
          <button className="login_signInBtn" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <button
          className="login_registerBtn"
          onClick={register}
          type="button"
          disabled={loading}
        >
          {loading ? "Processing..." : "Create your Amazon Account!"}
        </button>
      </div>
    </div>
  );
};

export default Login;
