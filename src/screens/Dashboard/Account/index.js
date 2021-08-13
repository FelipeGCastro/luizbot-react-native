import React, { useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'
import theme from '../../../global/styles/theme'
import Symbol from './Symbol'
import Strategy from './Strategy'

const Account = ({ data = {}, setBotOn, symbols, setSymbol, setStrategy, strategies, signOut }) => {
  const pickerRef = useRef()
  const pickerStrategyRef = useRef()

  function toogleBotOn () {
    const action = data.botOn ? 'Desligar' : 'Ligar'
    setAlert(action, () => setBotOn(!data.botOn))
  }

  function setSymbolValue (value) { setAlert(value, () => setSymbol(value)) }

  function setStrategyValue (value) { setAlert(value, () => setStrategy(value)) }

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
      <TouchableOpacity onPress={toogleBotOn} activeOpacity={0.70} style={styles.tradeOnContainer}>
        <Feather name='power' size={24} color={data?.botOn ? theme.colors.success : theme.colors.failed} />
        <Text style={styles.tradOnText}>{data?.botOn ? 'Ligado' : 'Desligado'}</Text>
      </TouchableOpacity>
      <Symbol
        symbol={data.symbol}
        symbols={symbols}
        pickerRef={pickerRef}
        styles={styles}
        setSymbolValue={setSymbolValue}
      />
      <Strategy
        strategy={data.strategy}
        strategies={strategies}
        styles={styles}
        pickerStrategyRef={pickerStrategyRef}
        setStrategyValue={setStrategyValue}
      />
      <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Total Ganho:</Text>
        <Text style={styles.optionValue}>0%</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Alavancagem:</Text>
        <Text style={styles.optionValue}>{data.leverage}x</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Valor Entrada:</Text>
        <Text style={styles.optionValue}>$ {Number(data.entryValue).toFixed(2)}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSignOut()} activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionValue}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  tradeAccountContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: 8,
    marginTop: 10
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
  optionContainer: {
    backgroundColor: theme.colors.button,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  optionLabel: {
    color: '#fff',
    fontSize: 15
  },
  optionValue: {
    color: '#fff',
    fontSize: 18
  },
  symbol: {
    fontSize: 23,
    color: theme.colors.normal
  },
  strategy: {
    fontSize: 20,
    color: theme.colors.normal
  }
})

export default Account
