import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Dashboard from '../screens/Dashboard'
import Symbols from '../screens/Symbols'
import theme from '../global/styles/theme'

const Stack = createStackNavigator()

function PrivateStack () {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen options={{ headerShown: false }} name='Home' component={Dashboard} />
      <Stack.Screen
        options={{
          title: 'Simbolos',
          headerStyle: {
            backgroundColor: theme.colors.button
          },
          headerTintColor: '#fff'
        }} name='Symbols' component={Symbols}
      />
    </Stack.Navigator>
  )
}

export default PrivateStack
