import axios from "axios";
// import jwt from "jsonwebtoken";

const API_URL = "http://localhost:8080/";

export const authService = {
  login: async (nomeUsuario: string, senha: string): Promise<string | null> => {
    const response = await axios.post(`${API_URL}authentication/login.php`, {
      nomeUsuario,
      senha,
    });
    return response.data.token;
  },

  validateToken: async (token: string): Promise<boolean> => {
    // try {
    //   const response = await axios.post(`${API_URL}/auth/validateToken`, { token });
    //   return response.data.valid;
    // } catch (error) {
    //   return false;
    // }

    // try {
    //   const decoded = jwt.verify(token, 'uU906FawB99P4fYUskZjZ85eYJDRRT10e2Y/D32kQ3Q=');
    //   return !!decoded;
    // } catch (error) {
    //   return false;
    // }

    return true;
  },

  // validatePassword: (password: string, hash: string): boolean => {
  //   return true;
  // },

  // hashPassword: (password: string): string => {
  //   return 'hashedPassword';
  // },

  // generateToken: (usuario: any): string => {
  //   return 'token';
  // },

  // generateResetToken: (usuario: any): string => {
  //   return 'resetToken';
  // },

  // verifyResetToken: (token: string): any => {
  //   return {};
  // }
};
