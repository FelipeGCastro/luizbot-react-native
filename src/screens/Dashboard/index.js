import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Alert, ActivityIndicator } from 'react-native'
import api from '../../services/api'

import TradeComponent from './trade'
import Account from './account'

import theme from '../../global/styles/theme'
import SwipeButton from 'rn-swipe-button'
import data from './data'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../../hooks/auth'

const Dashboard = () => {
  const accountdatakey = '@luizbot:accountdata'
  const { signOut } = useAuth()
  const [loadingData, setLoadingData] = useState(true)
  const [accountData, setAccountData] = useState(false)

  useEffect(() => {
    async function getUserStoraged () {
      const accountDataStoraged = await AsyncStorage.getItem(accountdatakey)
      if (accountDataStoraged) {
        const accountDataParsed = JSON.parse(accountDataStoraged)
        setAccountData(accountDataParsed)
      } else {
        await getAccountData()
      }
      setLoadingData(false)
    }
    getUserStoraged()
  }, [])

  async function getAccountData () {
    try {
      const result = await api.get('/account/')
      if (result) {
        setAccountData(result.data)
        console.log(result.data)
        AsyncStorage.setItem(accountdatakey, JSON.stringify(result.data))
      }
    } catch (error) {
      console.log('error fetching data', error)
      Alert.alert('Error', 'Problema ao tentar acessar seus dados')
      if (error.response.data.error === 'Token invalid') signOut()
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <TradeComponent />
      <View style={styles.marketSwipe} />
      <SwipeButton
        railBackgroundColor={theme.colors.button}
        railFillBackgroundColor={theme.colors.swipeColor}
        titleColor='#fff'
        title='Delize/Market'
        titleFontSize={16}
        railBorderColor={theme.colors.display}
        thumbIconBorderColor={theme.colors.display}
        thumbIconBackgroundColor={theme.colors.swipeColor}
        icon
      />
      {loadingData && <ActivityIndicator size='large' />}
      <View style={styles.tradeBody}>
        <Account data={accountData} />
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={data}
          contentContainerStyle={styles.contentContainer}
          style={styles.profitHistoryContainer}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.70} style={styles.profitBox}>
              <Text style={styles.profitTime}>{item.time}</Text>
              <Text style={styles.profitValue}>$ {item.value}</Text>
            </TouchableOpacity>
          )}
        />

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.background
  },
  tradeBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profitHistoryContainer: {
    flexGrow: 0,
    marginTop: 10,
    backgroundColor: theme.colors.button,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  profitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 5,
    backgroundColor: theme.colors.display,
    borderRadius: 6,
    marginBottom: 15
  },
  profitTime: {
    color: '#fff',
    fontSize: 14,
    marginRight: 7
  },
  profitValue: {
    color: theme.colors.success,
    fontSize: 18,
    marginLeft: 7
  }
})

export default Dashboard
