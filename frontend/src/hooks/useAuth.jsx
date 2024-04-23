import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const useAuth = (redirectPath) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to the specified path (login page)
        navigate(redirectPath);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate, redirectPath]);
};

export default useAuth;
