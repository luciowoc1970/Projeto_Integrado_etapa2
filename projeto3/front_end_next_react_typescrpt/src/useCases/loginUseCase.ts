
import { AuthContextType } from '@/utils/authContext';
import { authService } from '../services/authService';

export const loginUseCase = async (username: string, password: string, context: AuthContextType): Promise<boolean> => {
  try{
    const token = await authService.login(username, password)
    if (token) {
      localStorage.setItem('token', token)
      context.isloggedwithToken(token)
    } else {
      localStorage.removeItem('token')

      context.logout()
    }

    return true
  }catch(error: any){
    context.logout()

    return false
  }
};