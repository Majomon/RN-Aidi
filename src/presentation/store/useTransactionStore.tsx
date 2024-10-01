import axios from 'axios';
import {create} from 'zustand';

export interface RegisterState {
  transactions: any[];
  getAllTransactions: (token: string) => Promise<void>;
}

export const useTransactionStore = create<RegisterState>()(set => ({
  transactions: [],

  getAllTransactions: async (token: string) => {
    if (!token) {
      throw new Error('Token no disponible.');
    }

    try {
      const response = await axios.get(
        'http://192.168.0.6:3003/api/transactions',
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (response.status === 200) {
        set({transactions: response.data}); 
      }
    
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message ||
          'Ocurrió un error al obtener las transacciones',
      );
    }
  },
}));
