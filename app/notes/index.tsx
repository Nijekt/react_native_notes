import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import NoteList, { NoteType } from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";
import noteService from "@/services/noteService";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const NoteScreen = () => {
  const router = useRouter();

  const authContext = useAuth();
  const user = authContext?.user;
  const authLoading = authContext?.loading;

  const [notes, setNotes] = useState([] as NoteType[]);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | object>(null);

  useEffect(() => {
    if (!user && !authLoading) {
      router.replace("./auth");
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();
    if (response.error) {
      setError(response.error);
    } else {
      setNotes(response.data as unknown as NoteType[]);
      setError(null);
    }

    setLoading(false);
  };

  const addNote = async () => {
    if (noteText.trim() == "") return null;

    const response = await noteService.addNote(noteText);

    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes([...notes, response.data as unknown as NoteType]);
    }

    setNoteText("");
    setModalVisible(false);
  };

  const deleteNote = async (id: string) => {
    const response = await noteService.deleteNote(id);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      setNotes(notes.filter((note) => note.$id !== id));
    }
  };

  const updateNote = async (id: string, text: string) => {
    const response = await noteService.updateNote(id, text);
    if (response.error) {
      Alert.alert("Error", response.error);
    } else {
      const updatedNote = response.data as unknown as NoteType;
      setNotes((prevNotes) =>
        prevNotes.map((note: any) =>
          note.$id === id ? { ...note, text: updatedNote.text } : note
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={"large"} color={"#007bff"} />
      ) : (
        <>
          {error && <Text style={{ color: "red" }}>{error.toString()}</Text>}
          {/* Note List */}
          <NoteList notes={notes} onDelete={deleteNote} onEdit={updateNote} />
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Note</Text>
      </TouchableOpacity>

      {/* Modal */}
      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        noteText={noteText}
        setNoteText={setNoteText}
        addNote={addNote}
      />
    </View>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
