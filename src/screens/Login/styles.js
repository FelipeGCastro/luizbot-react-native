import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: stretch;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};

`
export const Title = styled.Text`
  color: white;
  font-size: 18px;
  align-self: center;
`

export const EmailInput = styled.TextInput`
    background-color: ${props => props.theme.colors.button};
    height: 50px;
    width: 85%;
    max-width: 400px;
    margin: 80px 0px 10px;
    color: #fff;
    padding: 5px 20px;
    border-radius: 6px;
    align-self: center;
`
export const PasswordInput = styled.TextInput`
    background-color: ${props => props.theme.colors.button};
    height: 50px;
    width: 85%;
    max-width: 400px;
    color: #fff;
    padding: 5px 20px;
    border-radius: 6px;
    align-self: center;
    margin-bottom: 20px;
`
export const StartButtonContainer = styled.View`
    width: 100%;
    align-self: center;
    height: 50px;
    height: 80px;
`
export const StartButton = styled.TouchableOpacity`
    background-color: ${props => props.theme.colors.success};
    height: 50px;
    width: 85%;
    max-width: 400px;
    border-radius: 6px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    align-self: center;
`
export const ButtonText = styled.Text`
    color: #fff;
    font-size: 18px;
`
