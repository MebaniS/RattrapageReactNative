import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp } from '@react-navigation/native';

import SignUpForm from './SignUpForm';
import AddNote from './AddNote';
import NotesList from './NotesList';
import { auth } from './firebaseconfig';
import { signOut } from 'firebase/auth';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
type TabNavigatorParams = {
  NotesList: undefined; 
  AddNote: undefined;
};

type NotesTabsProps = {
  navigation: NavigationProp<TabNavigatorParams, 'NotesList' | 'AddNote'>;
};

function NotesTabs({ navigation }: NotesTabsProps) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => signOut(auth)} title="Déconnexion" />
      ),
    });
  }, [navigation]);
  return (
    <Tab.Navigator>
      <Tab.Screen name="NotesList" component={NotesList} options={{ title: 'Mes Notes' }} />
      <Tab.Screen name="AddNote" component={AddNote} options={{ title: 'Ajouter une Note' }} />
    </Tab.Navigator>
  );
}

const App = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Application Notes" component={NotesTabs} options={({navigation})=> ({ 
            headerRight: () => ( 
              <Button onPress={() => signOut(auth)} title="Déconnexion" />
            ),
          })} 
        />
      ) : (
          
          <Stack.Screen name="SignUpForm" component={SignUpForm} options={{ title: 'Connexion / Inscription' }} />
          
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
