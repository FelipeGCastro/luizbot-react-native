import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../screens/Dashboard'
import Symbols from '../screens/Symbols'
import theme from '../global/styles/theme'
import { AccountProvider } from '../hooks/accountdata'
import Trade from '../screens/Trade'

const Stack = createStackNavigator()

function PrivateStack () {
  return (
    <AccountProvider>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name='Home' component={Dashboard} />
        <Stack.Screen
          options={{
            title: 'Simbolos',
            animationEnabled: false,
            headerStyle: {
              backgroundColor: theme.colors.button
            },
            headerTintColor: '#fff'
          }} name='Symbols' component={Symbols}
        />
        <Stack.Screen
          options={{
            title: 'Operação',
            animationEnabled: false,
            headerStyle: {
              backgroundColor: theme.colors.button
            },
            headerTintColor: '#fff'
          }} name='Trade' component={Trade}
        />
      </Stack.Navigator>
    </AccountProvider>
  )
}

export default PrivateStack
