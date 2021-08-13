import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'

import TradeComponent from './trade'
import Account from './account'
import AsyncStorage from '@react-native-async-storage/async-storage'

import theme from '../../global/styles/theme'
import SwipeButton from 'rn-swipe-button'
import data from './data'
import { useAuth } from '../../hooks/auth'
import { callGetApi, callUptadeApi } from './helpers'

const Dashboard = () => {
  const { signOut } = useAuth()
  const [loadingData, setLoadingData] = useState(true)
  const [accountData, setAccountData] = useState(false)
  const [symbols, setSymbols] = useState([])

  useEffect(() => {
    async function getAccountData () {
      const data = await callGetApi('/account/', null, signOut)
      setAccountData(data)
      const symbolsStoraged = await AsyncStorage.getItem('@luizbot:symbols')
      if (symbolsStoraged) {
        const symbolsParsed = JSON.parse(symbolsStoraged)
        setSymbols(symbolsParsed)
      } else {
        await getSymbols()
      }

      setLoadingData(false)
    }
    getAccountData()
  }, [])

  async function getSymbols () {
    const symbolsFetched = await callGetApi('/account/symbols', null, signOut)
    await AsyncStorage.setItem('@luizbot:symbols', JSON.stringify(symbolsFetched))
    setSymbols(symbolsFetched)
  }

  async function setSymbol (symbol) {
    setLoadingData(true)
    const data = await callUptadeApi('/account/symbol', { symbol })
    setAccountData(data)
    setLoadingData(false)
  }

  async function setBotOn (bool) {
    setLoadingData(true)
    const data = await callUptadeApi('/account/boton', { botOn: bool }, signOut)
    setAccountData(data)
    setLoadingData(false)
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
        <Account
          data={accountData}
          setBotOn={setBotOn}
          symbols={symbols}
          setSymbol={setSymbol}
        />
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
