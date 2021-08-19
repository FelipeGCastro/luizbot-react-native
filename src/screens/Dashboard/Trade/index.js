import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Foundation, AntDesign } from '@expo/vector-icons'
import theme from '../../../global/styles/theme'
import { useTrades } from '../../../hooks/trades'
import { getCorrectContext, getPercentage } from '../../../helpers/index'

const Trade = ({ account }) => {
  const context = getCorrectContext(account)
  const [tradesOn, setTradesOn] = useState([])
  const [isLive, setIsLive] = useState(false)
  const { accountData } = context()
  const { trades } = useTrades()

  useEffect(() => {
    if (accountData && accountData.tradesOn && accountData.tradesOn[0]) {
      setTradesOn(accountData.tradesOn)
      setIsLive(true)
    } else {
      if (trades && trades[0]) {
        const tradesObj = {
          symbol: trades[0].symbol,
          stopMarketPrice: trades[0].stopPrice,
          entryPrice: trades[0].entryPrice,
          takeProfitPrice: trades[0].profitPrice

        }
        setTradesOn([tradesObj])
        setIsLive(false)
      }
    }
  }, [accountData?.tradesOn, trades])
  return (
    <View style={styles.tradeWrapper}>
      <View style={styles.tradeStatus}>
        <Text style={styles.tradeStatusText}>{isLive ? 'Ao Vivo' : 'Ultimo Trade'}</Text>
        {isLive && <Foundation name='record' size={22} color='red' />}

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
              <View style={styles.priceAndIconContainer}>
                <Text style={{ ...styles.tradeValue, color: theme.colors.failed }}>{item.stopMarketPrice || '0.00'}</Text>
                {isLive && (
                  item.stopOrderCreated
                    ? <AntDesign name='check' size={14} color={theme.colors.success} />
                    : <AntDesign name='close' size={14} color={theme.colors.failed} />
                )}
              </View>
              <Text style={styles.percentage}>{getPercentage(item.entryPrice, item.stopMarketPrice).toFixed(2)} %</Text>
            </View>
            <View style={[styles.tradeColumn, styles.center]}>
              <Text style={styles.tradeValue}>{item.entryPrice || '0.00'}</Text>
              <Text style={styles.percentage}>{item.symbol}</Text>
            </View>
            <View style={[styles.tradeColumn, styles.right]}>
              <View style={styles.priceAndIconContainer}>
                {isLive && (
                  item.profitOrderCreated
                    ? <AntDesign name='check' size={14} color={theme.colors.success} />
                    : <AntDesign name='close' size={14} color={theme.colors.failed} />
                )}
                <Text style={{ ...styles.tradeValue, color: theme.colors.success }}>{item.takeProfitPrice || '0.00'}</Text>
              </View>
              <Text style={styles.percentage}>{getPercentage(item.entryPrice, item.takeProfitPrice).toFixed(2)} %</Text>
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
    flexGrow: 1,
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: theme.colors.swipeColor,
    backgroundColor: theme.colors.button,
    justifyContent: 'flex-start',
    borderBottomEndRadius: 6,
    borderBottomStartRadius: 6
  },
  tradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tradeColumn: {
    flex: 1
  },
  priceAndIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
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
