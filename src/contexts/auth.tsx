import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as auth from '../services/auth';

interface AuthContextData{
  signed: boolean;
  user: object | null;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null)

  async function signIn(){
    const response = await auth.signIn();
    setUser(response.user)

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
      }
    }

    loadStorageData();
  })

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;