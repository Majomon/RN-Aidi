import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {SectionList, Pressable, StyleSheet} from 'react-native';
import {StorageAdapter} from '../../../config/adapters/storage-adapter';
import {MyIcon} from '../../components/ui/MyIcon';
import {useTransactionStore} from '../../store/useTransactionStore';
import {Transaction} from '../../../interface/transaction.interface';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {InteractionStackParams} from '../../navigation/StackInteractions';

export const InteractionScreen = () => {
  const today = new Date().toLocaleDateString();
  const {getTransactionsUser, transactions} = useTransactionStore();
  const navigation =
    useNavigation<StackNavigationProp<InteractionStackParams>>();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await StorageAdapter.getItem('tokenLogin');
        if (token) {
          await getTransactionsUser(token);
        } else {
          console.error('Token no disponible');
        }
      } catch (error: any) {
        console.error('Error al obtener transacciones:', error.message);
      }
    };

    fetchTransactions();
  }, [getTransactionsUser]);

  const transactionsArray = transactions ? Object.values(transactions) : [];

  // Filtra transacciones de hoy
  const todayTransactions = transactionsArray.filter(transaction => {
    const transactionDate = new Date(transaction.date).toLocaleDateString();
    return transactionDate === today;
  });

  // Agrupa las transacciones por fecha
  const groupedTransactions = transactionsArray.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    },
    {} as {[key: string]: Transaction[]},
  );

  // Convierte a un array de secciones para SectionList
  const sections = [
    {
      title: 'Hoy',
      data: todayTransactions.length > 0 ? todayTransactions : [],
    },
    ...Object.keys(groupedTransactions).map(date => ({
      title: `Interacciones del ${date}`,
      data: groupedTransactions[date],
    })),
  ];

  const translateStatus = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobado';
      case 'disapproved':
        return 'Rechazado';
      case 'network_error':
        return 'Error de red';
      case 'user_not_found':
        return 'Usuario no encontrado';
      case 'waiting_user':
        return 'Pendiente';
      default:
        return status;
    }
  };

  const renderTransaction = ({item}: {item: Transaction}) => {
    const transactionTime = new Date(item.date).toLocaleTimeString();

    const handlePress = () => {
      navigation.navigate('InteractionDetailScreen', {
        idInteraction: item.id.toString(),
      });
    };

    return (
      <Pressable style={styles.interactionContainer} onPress={handlePress}>
        <Layout style={styles.detailContainer1}>
          <MyIcon name="radio-button-off-outline" />
          <Layout>
            <Text style={styles.city}>Empresa</Text>
            <Text style={styles.city}>{item.detail}</Text>
          </Layout>
          <Layout style={styles.statusContainer}>
            <Text style={styles.status}>{translateStatus(item.status)}</Text>
            <Text style={styles.time}>{transactionTime}</Text>
          </Layout>
        </Layout>
      </Pressable>
    );
  };

  const renderSectionHeader = ({section}: {section: {title: string}}) => (
    <Text style={styles.dateTitle}>{section.title}</Text>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.id.toString() + index}
      renderItem={renderTransaction}
      renderSectionHeader={renderSectionHeader}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 5,
  },
  detailContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  statusContainer: {
    gap: 1,
  },
  city: {
    fontSize: 16,
    fontWeight: '500',
  },
  time: {
    fontSize: 14,
    color: 'gray',
  },
  status: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'blue',
  },
  noTransactionsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginVertical: 20,
  },
});
