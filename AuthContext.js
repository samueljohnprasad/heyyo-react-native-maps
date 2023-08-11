import { createContext, useContext, useEffect, useState, useMemo } from "react";
import * as secureStore from "expo-secure-store";
import axios from "axios";
import { getBaseUrl } from "./helpers";
import { useDispatch } from "react-redux";
import { updateUserNameAndId } from "./src/store/reducer";
import Toast from "react-native-toast-message";

export const TOKEN_KEY_USER_DETAILS = "sdfjksd";
export const LOCATION_COORDS = "LOCATION_COORDS";

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
      const localData = await secureStore.getItemAsync(TOKEN_KEY_USER_DETAILS);

      if (!localData) {
        setIsAuthLoading(false);
        return;
      }
      const parseLocalData = JSON.parse(localData);

      if (parseLocalData?.token) {
        const { token, userName, userId } = parseLocalData;

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

      const result = await axios.post(guestUrl);

      const { token, userName, userId } = result.data;
      setAuthState({
        token: token,
        authenticated: true,
      });

      const user = {
        userName: userName,
        userId: userId,
      };

      dispatch(updateUserNameAndId(user));

      setUserDetails(user);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const localStorageDetails = {
        token: token,
        userName: userName,
        userId: userId,
      };
      await secureStore.setItemAsync(
        TOKEN_KEY_USER_DETAILS,
        JSON.stringify(localStorageDetails)
      );

      return result;
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "guest login failed!",
      });
      return { error: true };
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = async () => {
    setIsAuthLoading(true);
    await secureStore.deleteItemAsync(TOKEN_KEY_USER_DETAILS);
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
