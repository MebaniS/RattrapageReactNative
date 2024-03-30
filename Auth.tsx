import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "./firebaseconfig"

export const registerUser = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log('Utilisateur ajouté sur Firebase');
    console.log('Utilisateur connecté');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Utilisateur connecté');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
