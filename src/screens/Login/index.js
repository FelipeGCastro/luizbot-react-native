import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'
import { useAuth } from '../../hooks/auth'
import theme from '../../global/styles/theme'

export function Login () {
  const { signIn } = useAuth()
  const [email, onChangeEmail] = useState()
  const [password, onChangePassword] = useState()
  const [errors, setErrors] = useState([])

  const handleStartPress = async () => {
    if (!email || !password) {
      Alert.alert('Preencha corretamente os campos')
      return setErrors(errors.push('Precisa preencher'))
    }
    try {
      await signIn(email, password)
    } catch (error) {
      Alert.alert('Problemas ao autentica')
    }
    //
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luiz Bot</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize='none'
        keyboardType='email-address'
        placeholderTextColor='#ffffff'
        onChangeText={onChangeEmail}
        autoCompleteType='email'

      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='#fff'
        autoCompleteType='password'
        onChangeText={onChangePassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.startButton}
        activeOpacity={0.9}
        onPress={handleStartPress}
      >
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: theme.colors.background
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 50
  },
  input: {
    backgroundColor: theme.colors.button,
    height: 50,
    width: 400,
    maxWidth: '90%',
    marginBottom: 10,
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 6,
    alignSelf: 'center'
  },
  startButton: {
    backgroundColor: theme.colors.success,
    height: 50,
    maxWidth: '90%',
    width: 400,
    borderRadius: 6,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18
  }
})
