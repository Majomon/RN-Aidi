import axios from 'axios';
import {create} from 'zustand';

export interface RegisterState {
  token: string;

  register: (email: string) => Promise<boolean>;
}

export const useRegisterStore = create<RegisterState>()((set, get) => ({
  token: '',

  register: async (email: string) => {
    try {
      const response = await axios.post(
        'http://192.168.0.6:3004/api/users/sendEmailOtp',
        {email},
      );

      if (response.status === 200) {
        set({token: response.data.token});
      }
      return true;
    } catch (err: any) {
      throw new Error(
        err.response.data.message || 'Ocurrió un error al enviar el email',
      );
    }
  },
}));
