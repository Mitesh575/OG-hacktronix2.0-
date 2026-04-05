import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const ADMIN_EMAIL = "admin@hacktronix.com";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.email === ADMIN_EMAIL) {
        setUser({ email: firebaseUser.email, role: "admin", uid: firebaseUser.uid });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);

      if (credential.user.email !== ADMIN_EMAIL) {
        await signOut(auth);
        return { success: false, error: "This account is not allowed to access the admin dashboard" };
      }

      return { success: true };
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        return { success: false, error: "Invalid email or password" };
      }

      if (error.code === "auth/user-not-found") {
        return { success: false, error: "Admin account not found in Firebase Auth" };
      }

      return { success: false, error: error.message || "Login failed" };
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, loading, login, logout };
}
