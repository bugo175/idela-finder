import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { registerThunk, clearError } from '../authSlice';
import { colors } from '../../../shared/constants/colors';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleRegister = () => {
    setLocalError('');

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setLocalError('Tutti i campi sono obbligatori');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Le password non coincidono');
      return;
    }
    if (password.length < 8) {
      setLocalError('La password deve avere almeno 8 caratteri');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setLocalError('La password deve contenere almeno una lettera maiuscola');
      return;
    }
    if (!/[0-9]/.test(password)) {
      setLocalError('La password deve contenere almeno un numero');
      return;
    }
    if (!acceptTerms) {
      setLocalError('Devi accettare i Termini di Servizio');
      return;
    }
    if (!acceptPrivacy) {
      setLocalError('Devi accettare la Privacy Policy');
      return;
    }

    dispatch(registerThunk({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
      consents: {
        terms_of_service: true as const,
        privacy_policy: true as const,
        marketing: acceptMarketing,
      },
    }));
  };

  const displayError = localError || error;

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <Text style={styles.title}>Registrati</Text>
      <Text style={styles.subtitle}>Crea il tuo account iDealFinder</Text>

      {displayError && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{displayError}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={firstName}
        onChangeText={(t) => { setFirstName(t); setLocalError(''); if (error) dispatch(clearError()); }}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Cognome"
        value={lastName}
        onChangeText={(t) => { setLastName(t); setLocalError(''); if (error) dispatch(clearError()); }}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(t) => { setEmail(t); setLocalError(''); if (error) dispatch(clearError()); }}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(t) => { setPassword(t); setLocalError(''); }}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Conferma Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(t) => { setConfirmPassword(t); setLocalError(''); }}
        editable={!isLoading}
      />

      {/* GDPR Consents */}
      <View style={styles.consentSection}>
        <TouchableOpacity style={styles.consentRow} onPress={() => setAcceptTerms(!acceptTerms)} disabled={isLoading}>
          <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
            {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.consentText}>
            Accetto i <Text style={styles.consentLink}>Termini di Servizio</Text> *
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.consentRow} onPress={() => setAcceptPrivacy(!acceptPrivacy)} disabled={isLoading}>
          <View style={[styles.checkbox, acceptPrivacy && styles.checkboxChecked]}>
            {acceptPrivacy && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.consentText}>
            Accetto la <Text style={styles.consentLink}>Privacy Policy</Text> *
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.consentRow} onPress={() => setAcceptMarketing(!acceptMarketing)} disabled={isLoading}>
          <View style={[styles.checkbox, acceptMarketing && styles.checkboxChecked]}>
            {acceptMarketing && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.consentText}>
            Accetto di ricevere comunicazioni marketing
          </Text>
        </TouchableOpacity>

        <Text style={styles.requiredNote}>* Campi obbligatori</Text>
      </View>

      <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleRegister} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Registrati</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={isLoading}>
        <Text style={styles.linkText}>Hai già un account? Accedi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  errorBox: {
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  consentSection: {
    marginTop: 8,
    marginBottom: 20,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  consentText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  consentLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  requiredNote: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  linkText: {
    color: colors.primary,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 40,
  },
});
