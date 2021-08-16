import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import theme from '../../../global/styles/theme'
import { useAccountData } from '../../../hooks/accountdata'

const Trade = () => {
  const [tradesOn, setTradesOn] = useState([])
  const [isLive, setIsLive] = useState(false)
  const { accountData, trades } = useAccountData()

  useEffect(() => {
    if (accountData && accountData.tradesOn && accountData.tradesOn[0]) {
      setTradesOn(accountData.tradesOn)
      setIsLive(true)
    } else {
      if (trades && trades[0]) {
        const tradesObj = {
          symbol: trades[trades.length - 1].symbol,
          stopMarketPrice: trades[trades.length - 1].stopPrice,
          entryPrice: trades[trades.length - 1].entryPrice,
          takeProfitPrice: trades[trades.length - 1].profitPrice

        }
        setTradesOn([tradesObj])
      }
    }
  }, [accountData, trades])
  return (
    <View style={styles.tradeWrapper}>
      <View style={styles.tradeStatus}>
        <Text style={styles.tradeStatusText}>{isLive ? 'Ao Vivo' : 'Ultimo Trade'}</Text>
        {tradesOn[0] && <Foundation name='record' size={22} color='red' />}

      </View>
      <View style={styles.tradeBoxLabel}>
        <Text style={styles.tradeLabel}>StopLoss:</Text>
        <Text style={styles.tradeLabel}>Symbol/Entrada:</Text>
        <Text style={styles.tradeLabel}>Take Profit:</Text>
      </View>
      <View style={styles.tradeBox}>
        {tradesOn[0] && tradesOn.map((item, i) => (
          <View style={styles.tradeRow} key={i}>
            <View style={styles.tradeColumn}>
              <Text style={{ ...styles.tradeValue, color: theme.colors.failed }}>{item.stopMarketPrice || '0.00'}</Text>
              <Text style={styles.percentage}>0.00%</Text>
            </View>
            <View style={[styles.tradeColumn, styles.center]}>
              <Text style={styles.tradeValue}>{item.entryPrice || '0.00'}</Text>
              <Text style={styles.percentage}>{item.symbol}</Text>
            </View>
            <View style={[styles.tradeColumn, styles.right]}>
              <Text style={{ ...styles.tradeValue, color: theme.colors.success }}>{item.takeProfitPrice || '0.00'}</Text>
              <Text style={styles.percentage}>0.00%</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
// symbol
// stopMarketPrice
// takeProfitPrice
// entryPrice
// stopOrderCreated
// profitOrderCreated
const styles = StyleSheet.create({
  tradeWrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight + 15,
    marginBottom: 10
  },
  tradeStatus: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  tradeStatusText: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 5

  },
  tradeBoxLabel: {
    marginHorizontal: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: theme.colors.swipeColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopEndRadius: 6,
    borderTopStartRadius: 6
  },
  tradeBox: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: theme.colors.swipeColor,
    backgroundColor: theme.colors.button,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6
  },
  tradeRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tradeColumn: {
    flex: 1
  },
  left: {
    alignItems: 'flex-start'
  },
  right: {
    alignItems: 'flex-end'
  },
  center: {
    alignItems: 'center'
  },
  tradeLabel: {
    fontSize: 14,
    color: '#ffffff'
  },
  tradeValue: {
    fontSize: 16,
    color: '#ffffff'
  },
  percentage: {
    fontSize: 10,
    color: '#fff'
  }
})

export default Trade
