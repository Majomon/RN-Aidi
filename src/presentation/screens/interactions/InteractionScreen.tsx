import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {MyIcon} from '../../components/ui/MyIcon';

const interactions = [
  {id: '1', city: 'Ciudad A', time: '09:30 AM', weather: 'Soleado'},
  {id: '2', city: 'Ciudad B', time: '11:15 AM', weather: 'Nublado'},
  {id: '3', city: 'Ciudad C', time: '02:45 PM', weather: 'Lluvioso'},
  {id: '4', city: 'Ciudad D', time: '04:00 PM', weather: 'Ventoso'},
  {id: '5', city: 'Ciudad E', time: '07:20 PM', weather: 'Despejado'},
];

export const InteractionScreen = () => {
  const todayDate = new Date().toLocaleDateString();

  const renderItem = ({item}: {item: (typeof interactions)[0]}) => (
    <Layout style={styles.interactionContainer}>
      <Layout style={styles.detailContainer1}>
        <MyIcon name="radio-button-off-outline" />
        <Layout>
          <Text style={styles.city}>{item.city}</Text>
          <Text style={styles.time}>{item.weather}</Text>
        </Layout>
      </Layout>
      <Text style={styles.time}>{item.time}</Text>
    </Layout>
  );

  return (
    <Layout style={styles.container}>
      <Text style={styles.title}>Hoy</Text>
      <Text style={styles.date}>{todayDate}</Text>
      <FlatList
        data={interactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 18,
    marginBottom: 16,
    color: 'gray',
  },
  detailContainer1: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 6,
  },

  interactionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  city: {
    fontSize: 16,
    fontWeight: '500',
  },
  time: {
    fontSize: 14,
    color: 'gray',
  },
});
