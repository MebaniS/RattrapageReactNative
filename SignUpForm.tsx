import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { registerUser, loginUser } from './Auth';

interface Props {
    auth?: any; 
}

const SignUpForm: React.FC<Props> = ({ auth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="S'inscrire" onPress={handleRegister} />
        <Button title="Se connecter" onPress={handleLogin} />
      </View>
    </View>
  );
};

export default SignUpForm;
