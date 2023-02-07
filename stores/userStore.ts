import { defineStore } from "pinia";
import AuthService from "~~/services/AuthService";

export const useUserStore = defineStore("userStore", () => {
  const accessToken = ref<string>();
  // methods
  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      accessToken.value = response.accessToken;
      localStorage.setItem("accessToken", accessToken.value);
    } catch (error) {
      console.log(error);
    }
  };

  // return
  return {
    accessToken,
    login,
  };
});
