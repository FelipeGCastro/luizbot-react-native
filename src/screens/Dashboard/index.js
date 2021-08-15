import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'

import TradeComponent from './Trade'
import Account from './Account'
import Indicators from './Indicators'

import theme from '../../global/styles/theme'
import SwipeButton from 'rn-swipe-button'
import data from './data'
import { useAuth } from '../../hooks/auth'
import { callGetApi, callUptadeApi } from '../../services/helpers'

const Dashboard = ({ navigation }) => {
  const { signOut } = useAuth()
  const [loadingData, setLoadingData] = useState(true)
  const [accountData, setAccountData] = useState({})
  const [strategies, setStrategies] = useState({})

  useEffect(() => {
    async function getAccountData () {
      getAllAccountData()
      updatingData()
      getStrategies()
      setLoadingData(false)
    }
    getAccountData()
  }, [])

  function updatingData () { setInterval(() => { getAllAccountData() }, 30000) }
  function pushToSymbols () { navigation.push('Symbols', { symbols: accountData.symbols }) }

  async function getAllAccountData () {
    const data = await callGetApi('/account/', null, signOut)
    setAccountData(data)
  }

  async function getStrategies () {
    const data = await callGetApi('/account/strategies')
    setStrategies(data)
  }

  function setSymbol (symbol) { setAccountApi('/account/leverage', { symbol }) }
  function setStrategy (strategy) { setAccountApi('/account/leverage', { strategy }) }
  function setLeverage (leverage) { setAccountApi('/account/leverage', { leverage }) }
  function setEntryValue (entryValue) { setAccountApi('/account/entryValue', { entryValue }) }
  function setBotOn (bool) { setAccountApi('/account/boton', { botOn: bool }) }

  async function setAccountApi (path, params) {
    setLoadingData(true)
    const data = await callUptadeApi(path, params, signOut)
    setAccountData(data)
    setLoadingData(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TradeComponent data={accountData} />
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
      <Indicators lastIndicatorsData={accountData.lastIndicatorsData} />
      {loadingData && <ActivityIndicator color='#fff' size='large' />}
      <View style={styles.tradeBody}>
        <Account
          data={accountData}
          setBotOn={setBotOn}
          setSymbol={setSymbol}
          pushToSymbols={pushToSymbols}
          strategies={strategies}
          setStrategy={setStrategy}
          setLeverage={setLeverage}
          setEntryValue={setEntryValue}
          signOut={signOut}
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
