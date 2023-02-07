enum EAuthRoutes {
  Login = "/auth",
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  result: boolean;
  error: string;
}

// methods
export default class AuthService {
  static async login(login: string, password: string) {
    // composables
    const config = useRuntimeConfig();
    // methods
    const response = await $fetch<AuthResponse>(
      config.public.API_AUTH_SERVICE + EAuthRoutes.Login,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: {
          login,
          password,
        },
      }
    );
    return response;
  }
}
