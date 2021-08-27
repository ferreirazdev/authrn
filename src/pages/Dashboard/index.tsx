import React, {useContext} from 'react'
import { View, Button, Text, StyleSheet } from "react-native";
import AuthContext from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const { user, signOut } = useContext(AuthContext);

  function handleSignOut(){
    signOut()
  }

  return (
    <View style={styles.container}>
      <Text>{user?.name}</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Dashboard;