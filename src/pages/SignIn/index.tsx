import React, {useContext} from 'react';
import {View, Button, StyleSheet} from 'react-native';

import { signIn } from '../../services/auth';
import AuthContext from '../../contexts/auth';

const SignIn: React.FC = () => {
  const { signed, signIn, user } = useContext(AuthContext);

  console.log(signed)
  console.log(user)

  async function handleSign(){
    signIn()
  }

  return(
    <View style={styles.container}>
      <Button title="Sign In" onPress={handleSign} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SignIn;