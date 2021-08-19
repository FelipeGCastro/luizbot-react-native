import React from 'react'
import { FlatList, View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { format } from 'date-fns'
import theme from '../../../global/styles/theme'
import { useTrades } from '../../../hooks/trades'
import { getPercentage } from '../../../helpers'

// import { Container } from './styles';

const TradeHistory = ({ navigation }) => {
  const { trades, loadingTrades } = useTrades()
  return (
    <FlatList
      keyExtractor={item => item._id}
      data={trades}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={loadingTrades ? <ActivityIndicator size='large' color='#fff' /> : <View />}
      style={styles.profitHistoryContainer}
      renderItem={({ item }) => {
        const timeTrade = format(new Date(item.timestamp), 'kk:mm')
        return (
          <TouchableOpacity onPress={() => navigation.push('Trade', { trade: item })} activeOpacity={0.70} style={styles.profitBox}>
            <View style={styles.textColumn}>
              <Text style={styles.profitTime}>{timeTrade}</Text>
              <Text style={{ ...styles.symbol, color: theme.colors.normal }}>{item.symbol.split('USDT')[0]}</Text>
            </View>
            <View style={styles.textColumnRight}>
              <Text style={item.profit < 0 ? styles.profitValueFailed : styles.profitValueSuccess}>$ {Number(item.profit).toFixed(2)}</Text>
              <Text style={{ ...styles.profitTime }}>{getPercentage(item.entryPrice, item.closePrice).toFixed(2)}%</Text>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  profitHistoryContainer: {
    flex: 3,
    marginTop: 10,
    backgroundColor: theme.colors.button,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  contentContainer: {
    // justifyContent: 'center'
    // alignItems: 'stretch'
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
  textColumn: {
    justifyContent: 'space-between'
  },
  textColumnRight: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  profitTime: {
    color: '#fff',
    fontSize: 14
  },
  symbol: {
    color: '#fff',
    fontSize: 13,
    marginRight: 7
  },
  profitValueSuccess: {
    color: theme.colors.success,
    fontSize: 18,
    marginLeft: 7
  },
  profitValueFailed: {
    color: theme.colors.failed,
    fontSize: 18,
    marginLeft: 7
  }
})
export default TradeHistory
