import { database } from "./appwrite";

const databaseService = {
  async listDocuments(dbId: string, colId: string) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error: any) {
      console.log("Error listing documents:", error);
      return { errorMessage: error.message };
    }
  },

  async createDocument(
    dbId: string,
    colId: string,
    data: any,
    id: string | null = null
  ) {
    try {
      return await database.createDocument(dbId, colId, id ?? "", data);
    } catch (error: any) {
      console.log(error.message);
      return { errorMessage: error.message };
    }
  },

  async deleteDocument(dbId: string, colId: string, id: string) {
    try {
      await database.deleteDocument(dbId, colId, id);

      return { success: true };
    } catch (error: any) {
      console.log(error.message);
      return { errorMessage: error.message };
    }
  },

  async updateDocument(dbId: string, colId: string, id: string, data: any) {
    try {
      return await database.updateDocument(dbId, colId, id, data);
    } catch (error: any) {
      console.log(error.message);
      return { errorMessage: error.message };
    }
  },
};

export default databaseService;
