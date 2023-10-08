import { Text, View, Button } from 'react-native';
import { useAuth } from '../../AuthContext';

function LoginPage() {
  const { guestLogin } = useAuth();

  const onButtonPress = () => {
    guestLogin();
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>LoginPage</Text>
      <Button
        onPress={onButtonPress}
        title="Guest login"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

export default LoginPage;
