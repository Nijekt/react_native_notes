import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  async getNotes(userId: string) {
    if (!userId) {
      console.log("User ID is required");
      return {
        data: [],
        error: "User ID is required",
      };
    }

    try {
      const response = await databaseService.listDocuments(dbId!, colId!, [
        Query.equal("user_id", userId),
      ]);
      return response;
    } catch (error: any) {
      console.log("Error fetching notes", error.message);
      return { data: [], error: error.message };
    }

    // if ("error" in response) {
    //   return { error: response.error };
    // }

    // return { data: response };
  },

  async addNote(user_id: string, text: string) {
    if (!text) {
      return { error: "Please enter a note" };
    }

    const data = { text, user_id, createdAt: new Date().toISOString() };

    const response = await databaseService.createDocument(
      dbId!,
      colId!,
      data,
      ID.unique()
    );

    if (response?.errorMessage) {
      return { error: response.errorMessage };
    }

    return { data: response };
  },

  async deleteNote(id: string) {
    const response = await databaseService.deleteDocument(dbId!, colId!, id);

    if (response?.errorMessage) {
      return { error: response.errorMessage };
    }

    return { succes: true };
  },

  async updateNote(id: string, text: string) {
    const response = await databaseService.updateDocument(dbId!, colId!, id, {
      text,
    });

    if (response?.errorMessage) {
      return { error: response.errorMessage };
    }

    return { data: response };
  },
};

export default noteService;
