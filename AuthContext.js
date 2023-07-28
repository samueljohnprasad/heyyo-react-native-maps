import { createContext, useContext, useEffect, useState, useMemo } from "react";
import * as secureStore from "expo-secure-store";
import axios from "axios";
import { getBaseUrl } from "./helpers";
import { useDispatch } from "react-redux";
import { updateUserNameAndId } from "./src/store/reducer";

export const TOKEN_KEY = "sdfjksd";
const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: false,
  });
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    userName: "",
    userId: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      setIsAuthLoading(true);
      const localData = await secureStore.getItemAsync(TOKEN_KEY);

      if (!localData) {
        setIsAuthLoading(false);
        return;
      }
      const parseLocalData = JSON.parse(localData);
      console.log({ parseLocalData });
      if (parseLocalData?.token) {
        const { token, userName, userId } = parseLocalData;
        console.log("userId", { token, userName, userId });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token,
          authenticated: true,
        });

        const user = {
          userName: userName,
          userId: userId,
        };
        setUserDetails(user);
        setIsAuthLoading(false);
      }
    };
    loadToken();
  }, []);

  const guestLogin = async () => {
    try {
      setIsAuthLoading(true);
      const guestUrl = `${getBaseUrl()}/guest-login`;
      console.log({ guestUrl });

      const result = await axios.post(guestUrl);
      console.log("data guestLogin ", { result: result.data });
      const { token, userName, userId } = result.data;
      setAuthState({
        token: token,
        authenticated: true,
      });

      const user = {
        userName: userName,
        userId: userId,
      };
      console.log("dispatch a");
      dispatch(updateUserNameAndId(user));
      console.log("dispatch b");
      setUserDetails(user);
      setIsAuthLoading(false);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const localStorageDetails = {
        token: token,
        userName: userName,
        userId: userId,
      };
      await secureStore.setItemAsync(
        TOKEN_KEY,
        JSON.stringify(localStorageDetails)
      );

      return result;
    } catch (e) {
      console.log("errror guestLogin", { e });
      return { error: true };
    }
  };

  const logout = async () => {
    setIsAuthLoading(true);
    await secureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
    setUserDetails({
      userName: "",
      userId: null,
    });
    setIsAuthLoading(false);
  };

  const value = useMemo(() => ({
    logout,
    guestLogin,
    authState,
    isAuthLoading,
    userDetails,
  }));
  console.log({ children });
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
