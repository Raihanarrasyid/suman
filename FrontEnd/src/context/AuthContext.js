import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // const API = "https://suman-backend.vercel.app";
  const API = "http://localhost:3001";
  const [user, setUser] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cartAmount, setCartAmount] = useState(0);

  const getCartAmount = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`${API}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const cartAmount = response.data.cart.amountOfItem;
          setCartAmount(cartAmount);
          localStorage.setItem("cartAmount", cartAmount);
        }
      } catch (error) {
        console.error("Error getting cart amount: ", error);
      }
    }
  };

  const addToCart = (id, amount, size) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .put(
          `${API}/cart`,
          {
            id,
            amount,
            size,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setCartAmount(response.data.cart.amountOfItem);
            localStorage.setItem("cartAmount", response.data.cart.amountOfItem);
          }
        })
        .catch((error) => {
          console.error("Error adding to cart: ", error);
        });
    }
  };

  const updateCart = (id, amount, size) => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(
          `${API}/cart`,
          {
            id,
            amount,
            size,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setCartAmount(response.data.cart.amountOfItem);
            localStorage.setItem("cartAmount", response.data.cart.amountOfItem);
          }
        })
        .catch((error) => {
          console.error("Error adding to cart: ", error);
        });
    }
  };

  const login = async (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    await getCartAmount();

    await checkAdminPermission();
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("cartAmount");
    setUser(null);
  };

  const checkAdminPermission = () => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${API}/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsAdmin(true);
            if (localStorage.getItem("isAdmin") === null) {
              localStorage.setItem("isAdmin", true);
            }
          } else if (response.status === 403) {
            setIsAdmin(false);
          }
        })
        .catch((error) => {
          setIsAdmin(false); // Handle errors by assuming user is not an admin
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        checkAdminPermission,
        isAdmin,
        loading,
        API,
        cartAmount,
        getCartAmount,
        addToCart,
        updateCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
