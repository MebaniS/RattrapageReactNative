import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebaseconfig';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = async () => {
    if (title.trim() === '' || content.trim() === '') return;
    try {
      await addDoc(collection(db, 'notes'), { title, content });
      setTitle('');
      setContent('');
      
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Titre de la note"
        style={styles.input}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Contenu de la note"
        multiline
        style={styles.input}
      />
      <Button title="Ajouter la note" onPress={handleAddNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});

export default AddNote;
