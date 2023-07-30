import { QueryClient, QueryClientProvider } from "react-query";
import UserLocation from "./src/MapComponent/UserLocation";
const queryClient = new QueryClient();
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./src/MapComponent/LoginPage";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider, useSelector } from "react-redux";
import { store } from "./src/store/index";
import { useAuth, AuthProvider } from "./AuthContext";
import { useEffect } from "react";
import * as secureStore from "expo-secure-store";
import UserProfile from "./src/MapComponent/UserProfile";
import PostOverViewModal from "./src/MapComponent/PostOverViewModal";
import PageOverLay from "./src/MapComponent/PageOverLay";
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

export function Layout() {
  const { authState, isAuthLoading, guestLogin } = useAuth();
  const isLoading = useSelector((store) => store.map.isLoading);

  // useEffect(() => {
  //   const hey = async () => {
  //     await secureStore.deleteItemAsync("sdfsd");
  //   };
  //   hey();
  // });
  // if (isAuthLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  return (
    <PageOverLay isLoading={isAuthLoading || isLoading}>
      <NavigationContainer>
        <Stack.Navigator>
          {!authState?.authenticated ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginPage}
            />
          ) : (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="MapComponent"
                component={UserLocation}
              />
              <Stack.Screen
                options={{ headerShown: false, presentation: "modal" }}
                name="Home"
                component={UserProfile}
              />
              <Stack.Screen
                options={{ headerShown: false, presentation: "modal" }}
                name="PostOverViewModal"
                component={PostOverViewModal}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </PageOverLay>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Provider>
  );
}
