import React from 'react'
import { FlatList, View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { format } from 'date-fns'
import theme from '../../../global/styles/theme'
import { useAccountData } from '../../../hooks/accountdata'

// import { Container } from './styles';

const TradeHistory = () => {
  const { trades, loadingTrades } = useAccountData()
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
          <TouchableOpacity activeOpacity={0.70} style={styles.profitBox}>
            <Text style={styles.profitTime}>{timeTrade}</Text>
            <Text style={styles.profitValue}>$ {Number(item.profit).toFixed(2)}</Text>
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
export default TradeHistory
