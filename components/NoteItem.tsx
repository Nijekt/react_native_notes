import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { FC, useRef, useState } from "react";
import { NoteType } from "./NoteList";

type Props = {
  note: NoteType;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const NoteItem: FC<Props> = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const inputRef = useRef(null);

  const handleSave = () => {
    if (editedText.trim() === "") return;
    onEdit(note.$id, editedText);
    setIsEditing(false);
  };

  return (
    <View style={styles.noteItem}>
      {isEditing ? (
        <TextInput
          ref={inputRef}
          value={editedText}
          onChangeText={setEditedText}
          autoFocus
          style={styles.input}
          onSubmitEditing={handleSave}
          returnKeyType="done"
        />
      ) : (
        <Text style={styles.noteText}>{note.text}</Text>
      )}

      <View style={styles.action}>
        {isEditing ? (
          <TouchableOpacity
            onPress={() => {
              handleSave();
              (inputRef.current as unknown as TextInput).blur();
            }}
          >
            <Text>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Text style={{ color: "orange", fontSize: 24, marginRight: 10 }}>
              ✎
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => onDelete(note.$id)}>
          <Text style={{ color: "red", fontSize: 20 }}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
  },
  input: {},
});
export default NoteItem;
