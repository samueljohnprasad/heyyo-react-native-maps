/* eslint-disable import/no-extraneous-dependencies */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import UserLocation from './src/MapComponent/UserLocation';
import LoginPage from './src/MapComponent/LoginPage';
import { store } from './src/store/index';
import { useAuth, AuthProvider } from './AuthContext';
import UserProfile from './src/MapComponent/UserProfile';
import PostOverViewModal from './src/MapComponent/PostOverViewModal';
import PageOverLay from './src/MapComponent/PageOverLay';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(en);

const Stack = createNativeStackNavigator();

export function Layout() {
  const { authState, isAuthLoading } = useAuth();
  const isLoading = useSelector((state) => state.map.isLoading);

  return (
    <PageOverLay isLoading={isAuthLoading || isLoading}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: '#fff' },
          }}
        >
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
                options={{ headerShown: false, presentation: 'modal' }}
                name="Home"
                component={UserProfile}
              />
              <Stack.Screen
                options={{ headerShown: false, presentation: 'modal' }}
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
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}
