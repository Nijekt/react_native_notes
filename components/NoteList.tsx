import { View, Text, FlatList } from "react-native";
import React, { FC } from "react";
import NoteItem from "./NoteItem";

export type NoteType = { $id: string; text: string };

type Props = {
  notes: NoteType[];
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const NoteList: FC<Props> = ({ notes, onDelete, onEdit }) => {
  return (
    <View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
    </View>
  );
};

export default NoteList;
