import React from 'react'
import {
  Container,
  Title,
  EmailInput,
  PasswordInput,
  StartButtonContainer,
  StartButton,
  ButtonText
} from './styles'

export function Login () {
  return (
    <Container>
      <Title>Luiz Bot</Title>
      <EmailInput
        placeholder='Email'
        placeholderTextColor='#ffffff'
        autoCompleteType='email'
      />
      <PasswordInput
        placeholder='Password'
        placeholderTextColor='#fff'
        autoCompleteType='password'
        secureTextEntry
      />
      <StartButtonContainer>
        <StartButton
          activeOpacity={0.9}
          onPress={() => {}}
        >
          <ButtonText>Começar</ButtonText>
        </StartButton>
      </StartButtonContainer>
    </Container>
  )
}
