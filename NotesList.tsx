import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, TextInput,Modal } from 'react-native';
import { collection, getDocs, deleteDoc, doc,onSnapshot,updateDoc } from 'firebase/firestore';
import { db } from './firebaseconfig';

const NotesList = () => {
    const [selectedNote, setSelectedNote] = useState<{id: string, title: string, content: string} | null>(null);
    const [isEditing, setIsEditing] = useState(false);  
    const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notes"), (querySnapshot) => {
      const notesArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArray);
    });
  
    return () => unsubscribe();
  }, []);
  const handleSelectNote = (note: {id: string, title: string, content: string}) => {
    setSelectedNote(note);
    setIsEditing(false); 
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = async (id: string, title: string, content: string) => {
    
    const noteRef = doc(db, 'notes', id);
    try {
      await updateDoc(noteRef, { title, content });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  
  const handleDeleteNote = async (id: string) => {
    await deleteDoc(doc(db, 'notes', id));
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <View>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectNote(item)}>
            <Text>{item.title}</Text>
            <Button title="Supprimer" onPress={() => handleDeleteNote(item.id)} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      {selectedNote && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditing || selectedNote != null}
          onRequestClose={() => {
            setSelectedNote(null);
            setIsEditing(false);
          }}
        >
          <View style={styles.editSection}>
            {!isEditing ? (
              <>
                <Text style={styles.noteTitle}>{selectedNote.title}</Text>
                <Text style={styles.noteContent}>{selectedNote.content}</Text>
                <Button title="Modifier" onPress={handleEdit} />
                <Button title="Fermer" onPress={() => setSelectedNote(null)} />
              </>
            ) : (
              <>
                <TextInput 
                  value={selectedNote.title} 
                  onChangeText={(text) => setSelectedNote({ ...selectedNote, title: text })} 
                  placeholder="Titre" 
                  style={styles.input} 
                />
                <TextInput 
                  value={selectedNote.content} 
                  onChangeText={(text) => setSelectedNote({ ...selectedNote, content: text })} 
                  placeholder="Contenu" 
                  multiline 
                  style={[styles.input, { height: 100 }]} 
                />
                <Button title="Sauvegarder" onPress={() => handleSave(selectedNote.id, selectedNote.title, selectedNote.content)} />
              </>
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  noteItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteContent: {
    marginTop: 8,
    fontSize: 16,
  },
  editSection: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
  },
  button: {
    marginBottom: 16,
  },
});

export default NotesList;
