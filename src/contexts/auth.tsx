import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import * as auth from '../services/auth';
import api from "../services/api";

interface User {
  name: string;
  email: string;
}

interface AuthContextData{
  signed: boolean;
  user: User | null;
  signIn(): Promise<void>;
  signOut(): void;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);

  async function signIn(){
    const response = await auth.signIn();
    setUser(response.user)

    api.defaults.headers.Authorization = `Baerer ${response.token}`;

    await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    await AsyncStorage.setItem('@RNAuth:token', response.token);
  }

  async function signOut(){
    await AsyncStorage.clear();
    setUser(null);
    
  }

  useEffect(() => {
    async function loadStorageData(){
      const storagedUser = await AsyncStorage.getItem('@RNAth:user')
      const storagedToken = await AsyncStorage.getItem('@RNAuth:token')


      if(storagedUser && storagedToken){
        setUser(JSON.parse(storagedUser))
        setLoading(false)
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`

      }
    }

    loadStorageData();
  })

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;