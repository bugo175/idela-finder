import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/constants/colors';

export default function ProductListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prodotti</Text>
      <Text style={styles.subtitle}>Cerca e confronta i prezzi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});
