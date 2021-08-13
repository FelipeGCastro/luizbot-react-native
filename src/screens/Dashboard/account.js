import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import theme from '../../global/styles/theme'

const STRATEGIES = {
  sharkStrategy: 'Tubarão',
  hiddenDivergence: 'Hidden Divergence'
}

const Account = ({ data }) => {
  return (
    <View style={styles.tradeAccountContainer}>
      <TouchableOpacity activeOpacity={0.70} style={styles.tradeOnContainer}>
        <Feather name='power' size={24} color={data.botOn ? theme.colors.success : theme.colors.failed} />
        <Text style={styles.tradOnText}>{data.botOn ? 'Ligado' : 'Desligado'}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Simbolo:</Text>
        <Text style={[styles.optionValue, styles.symbol]}>{data.symbol}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Estratégia:</Text>
        <Text style={[styles.optionValue, styles.strategy]}>{STRATEGIES[data.strategy]}</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Total Ganho:</Text>
        <Text style={styles.optionValue}>200%</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Alavancagem:</Text>
        <Text style={styles.optionValue}>{data.leverage}x</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Valor Entrada:</Text>
        <Text style={styles.optionValue}>$ {Number(data.entryValue).toFixed(2)}</Text>
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
    marginBottom: 10
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
