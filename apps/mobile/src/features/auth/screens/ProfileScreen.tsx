import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../authSlice';
import { colors } from '../../../shared/constants/colors';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profilo</Text>
      <TouchableOpacity style={styles.button} onPress={() => dispatch(logout())}>
        <Text style={styles.buttonText}>Esci</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
