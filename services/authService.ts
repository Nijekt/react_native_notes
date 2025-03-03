import { account } from "./appwrite";
import { ID } from "react-native-appwrite";

const authService = {
  async register(email: string, password: string) {
    try {
      const response = await account.create(ID.unique(), email, password);

      return response;
    } catch (error: any) {
      return { errorMessage: error.message };
    }
  },
  async login(email: string, password: string) {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );

      return response;
    } catch (error: any) {
      return { errorMessage: error.message };
    }
  },

  async getUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  },

  async logout() {
    try {
      await account.deleteSession("current");
      console.log("Logged out");

      return;
    } catch (error: any) {
      return { errorMessage: error.message };
    }
  },
};

export default authService;
