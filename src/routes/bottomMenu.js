import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AccountPrimaryProvider } from '../hooks/accountPrimary'
import AccountPrimaryScreen from './accountPrimary'
import AccountSecondaryScreen from './accountSecondary'
import { AccountSecondaryProvider } from '../hooks/accountSecondary'
import { TradesProvider } from '../hooks/trades'
import { MaterialIcons } from '@expo/vector-icons'
import theme from '../global/styles/theme'
import Symbols from '../screens/Symbols'
import Trade from '../screens/Trade'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

function TabHome () {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
      // You can return any component that you like here!
        return <MaterialIcons name='attach-money' size={size} color={color} />
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: theme.colors.background,
      tabBarStyle: { backgroundColor: theme.colors.swipeColor, paddingBottom: 5 }
    })}
    >
      <Tab.Screen name='primary' component={AccountPrimaryScreen} options={{ headerShown: false, animationEnabled: false }} />
      <Tab.Screen name='secondary' component={AccountSecondaryScreen} options={{ headerShown: false, animationEnabled: false }} />
    </Tab.Navigator>
  )
}

function PrivateStack () {
  return (
    <SafeAreaProvider>
      <AccountPrimaryProvider>
        <AccountSecondaryProvider>
          <TradesProvider>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen options={{ headerShown: false, animationEnabled: false }} name='Home' component={TabHome} />
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
          </TradesProvider>
        </AccountSecondaryProvider>

      </AccountPrimaryProvider>
    </SafeAreaProvider>

  )
}

export default PrivateStack
