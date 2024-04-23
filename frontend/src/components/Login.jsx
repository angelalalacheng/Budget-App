import React, { useState } from "react";
import axios from "axios";
import { auth } from "../config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  /************************State variable and function***********************/
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  /************************State variable and function***********************/

  const [signInStatus, setSignInStatus] = useState("");

  /*********************************Function*********************************/

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Send the idToken to backend for verification
      const response = await axios.post("/google-signin", {
        idToken: idToken,
      });

      if (response.data.success) {
        // Update the user context with the user’s information
        setUser(result.user);

        // Save the user to local storage
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect to homepage after successful sign-in
        navigate("/");
      } else {
        setSignInStatus("Google Sign-In failed.");
      }
    } catch (error) {
      setSignInStatus("Google Sign-In failed.");
    }
  };

  /*********************************Function*********************************/

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-6 bg-dark text-white d-flex align-items-center justify-content-center">
          <img
            src="/logos/logo-login.png"
            className="img-fluid mx-auto d-block"
            style={{
              width: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            alt="BudgetBuddy"
          />
        </div>

        <div className="col-md-6 bg-light d-flex align-items-center justify-content-center">
          <div className="card-body text-center">
            <h3 className="card-title mb-5">
              Sign in with your Google account!
            </h3>
            <button className="btn btn-dark mt-5" onClick={handleGoogleSignIn}>
              Sign in with Google
            </button>
            {signInStatus && (
              <div
                className="alert alert-danger mt-5 col-md-6 offset-md-3"
                role="alert"
              >
                <div>
                  <i className="bi bi-exclamation-triangle-fill m-2"></i>
                  {signInStatus}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
