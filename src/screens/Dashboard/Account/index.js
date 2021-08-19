import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import theme from '../../../global/styles/theme'
import Symbols from './Symbols'
import Strategy from './Strategy'
import Leverage from './Leverage'
import EntryValue from './entryValue'
import { useAuth } from '../../../hooks/auth'
import { getCorrectContext } from '../../../helpers'
import { useTrades } from '../../../hooks/trades'

const Account = ({ navigation, account }) => {
  const context = getCorrectContext(account)
  const { accountData, setAccountApi, refresh, strategies } = context()
  const { trades } = useTrades()

  const [totalGain, setTotalGain] = useState(0)
  const { signOut } = useAuth()
  useEffect(() => {
    let total = 0
    if (trades && trades[0]) {
      trades.forEach(trade => {
        total += Number(trade.profit)
      })
    }
    setTotalGain(total)
  }, [trades])

  const pickerStrategyRef = useRef()
  function toogleBotOn () {
    const action = accountData?.botOn ? 'Desligar' : 'Ligar'
    setAlert(action, () => setBotOn(!accountData.botOn))
  }

  function pushToSymbols () { navigation.push('Symbols', { symbols: accountData?.symbols }) }
  function setStrategy (strategy) { setAccountApi('/account/strategy', { strategy }) }
  function setLeverage (leverage) { setAccountApi('/account/leverage', { leverage }) }
  function setEntryValue (entryValue) { setAccountApi('/account/entryValue', { entryValue }) }
  function setBotOn (bool) { setAccountApi('/account/boton', { botOn: bool }) }

  function setStrategyValue (value) { setAlert(value, () => setStrategy(value)) }
  function setLeverageValue (value) { setAlert(`${value}x`, () => setLeverage(value)) }
  function setEntryValueValue (value) { setAlert(`$ ${Number(value).toFixed(2)}`, () => setEntryValue(value)) }

  function handleSignOut () { setAlert('Sign Out', () => signOut()) }

  function setAlert (actionName, func) {
    Alert.alert(actionName, 'Tem certeza que deseja fazer essa ação?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      { text: 'OK', onPress: () => func() }
    ])
  }
  return (
    <View style={styles.tradeAccountContainer}>
      <View style={styles.botOnAndRefreshContainer}>
        <TouchableOpacity onPress={toogleBotOn} activeOpacity={0.70} style={styles.tradeOnContainer}>
          <Feather name='power' size={24} color={accountData?.botOn ? theme.colors.success : theme.colors.failed} />
          <Text style={styles.tradOnText}>{accountData?.botOn ? 'Ligado' : 'Desligado'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refresh()} activeOpacity={0.70} style={styles.tradeOnContainer}>
          <Text style={styles.refreshText}>Refresh</Text>
          <Feather name='refresh-ccw' size={24} color='white' />
        </TouchableOpacity>
      </View>
      <Symbols
        symbols={accountData?.symbols}
        pushToSymbols={pushToSymbols}
        styles={styles}
      />
      <Strategy
        strategy={accountData?.strategy}
        strategies={strategies}
        styles={styles}
        pickerStrategyRef={pickerStrategyRef}
        setStrategyValue={setStrategyValue}
      />
      <TouchableOpacity activeOpacity={0.70} style={styles.gainContainer}>
        <Text style={styles.optionLabel}>Total Ganho:</Text>
        <Text style={styles.optionValue}>$ {totalGain.toFixed(2)}</Text>
      </TouchableOpacity>
      <Leverage
        leverage={accountData?.leverage}
        styles={styles}
        setLeverageValue={setLeverageValue}
      />
      <EntryValue
        entryValue={accountData?.entryValue}
        styles={styles}
        setEntryValueValue={setEntryValueValue}
      />

      <TouchableOpacity onPress={() => handleSignOut()} activeOpacity={0.70} style={[styles.marginTop, styles.optionContainer]}>
        <Text style={styles.optionValue}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  tradeAccountContainer: {
    flex: 2,
    alignItems: 'flex-start',
    marginHorizontal: 8,
    marginTop: 10
  },
  botOnAndRefreshContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tradeOnContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.button,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 0
  },
  tradOnText: {
    color: '#fff',
    marginLeft: 10
  },
  refreshText: {
    color: '#fff',
    marginRight: 10
  },
  gainContainer: {
    backgroundColor: theme.colors.button,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 10
  },
  optionContainer: {
    backgroundColor: theme.colors.button,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6
  },
  marginTop: {
    marginTop: 10
  },
  optionLabel: {
    color: '#fff',
    fontSize: 15
  },
  optionValue: {
    color: '#fff',
    fontSize: 18
  },
  symbols: {
    fontSize: 16,
    color: theme.colors.normal
  },
  strategy: {
    fontSize: 20,
    color: theme.colors.normal
  }
})

export default Account
