import { authService } from "../services/authService";
import { emailService } from "../services/emailService";
import { usuarioService } from "../services/usuarioService";


export const resetPasswordUseCase = async (email: string): Promise<void> => {
  const usuario = await usuarioService.findByEmail(email); // Assumindo que existe um método findByEmail
  if (usuario) {
    const resetToken = authService.generateResetToken(usuario);
    await emailService.sendPasswordResetEmail(email, resetToken);
  } else {
    throw new Error('Email not found');
  }
};