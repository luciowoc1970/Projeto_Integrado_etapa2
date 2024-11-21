import { authService } from "../services/authService";
import { usuarioService } from "../services/usuarioService";


export const changePasswordUseCase = async (idUsuario: number, newPassword: string): Promise<void> => {
  const newPasswordHash = authService.hashPassword(newPassword);
  await usuarioService.updatePassword(idUsuario, newPasswordHash);
};