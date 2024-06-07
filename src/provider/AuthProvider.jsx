import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GithubAuthProvider } from "firebase/auth/web-extension";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState({ name: "", category: "" });
  const googleProvider = new GoogleAuthProvider();
  const [navLoader, setNavLoader] = useState(false);
  const gitHubProvider = new GithubAuthProvider();
  const [loader, setLoader] = useState(true);

  const signUpUsers = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUsers = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInWithGitHub = () => {
    return signInWithPopup(auth, gitHubProvider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    if (name && photo) {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    } else if (name) {
      return updateProfile(auth.currentUser, {
        displayName: name,
      });
    } else {
      return updateProfile(auth.currentUser, {
        photoURL: photo,
      });
    }
  };

  const authInfo = {
    user,
    loader,
    navLoader,
    signUpUsers,
    signInUsers,
    signInWithGoogle,
    signInWithGitHub,
    updateUserProfile,
    logOut,
    setSearchTerm,
    searchTerm,
  };

  useEffect(() => {
    setNavLoader(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoader(false);
      setNavLoader(false);

      const email = currentUser?.email
        ? currentUser?.email
        : currentUser?.reloadUserInfo?.providerUserInfo[0].email;

      if (currentUser) {
        axiosPublic.post("/jwt", { email }).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
