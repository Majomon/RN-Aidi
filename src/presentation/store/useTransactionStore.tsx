import axios from 'axios';
import {create} from 'zustand';

export interface RegisterState {
  transactions: any[];
  transactionId: any;

  getTransactionsUser: (token: string) => Promise<void>;
  getTransactionId: (token: string, id: string) => Promise<void>;
  putTransactionId: (
    token: string,
    id: string,
    status: string,
  ) => Promise<void>;
}

export const useTransactionStore = create<RegisterState>()(set => ({
  transactions: [],
  transactionId: {},

  getTransactionsUser: async (token: string) => {
    if (!token) {
      throw new Error('Token no disponible.');
    }

    try {
      const response = await axios.get(
        'http://192.168.0.6:3003/api/transactions/user',
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (response.status === 200) {
        set({transactions: response.data.transactions});
      }
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message ||
          'Ocurrió un error al obtener las transacciones',
      );
    }
  },

  getTransactionId: async (token: string, id: string) => {
    if (!id) {
      throw new Error('Token no disponible.');
    }

    try {
      const response = await axios.get(
        `http://192.168.0.6:3003/api/transactions/${id}`,
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (response.status === 200) {
        set({transactionId: response.data.transaction});
      }
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message ||
          'Ocurrió un error al obtener las transacciones',
      );
    }
  },

  putTransactionId: async (token: string, id: string, status: string) => {
    if (!id) {
      throw new Error('Token no disponible.');
    }

    try {
      const response = await axios.put(
        `http://192.168.0.6:3003/api/transactions/${id}`,
        {status},
        {
          headers: {
            authorization: token,
          },
        },
      );

      if (response.status === 200) {
        console.log('Se cambio el estado de la transaccion');
      }
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message ||
          'Ocurrió un error al obtener las transacciones',
      );
    }
  },
}));
