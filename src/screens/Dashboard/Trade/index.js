import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import theme from '../../../global/styles/theme'

const Trade = ({ data }) => {
  return (
    <View style={styles.tradeWrapper}>
      <View style={styles.tradeStatus}>
        <Text style={styles.tradeStatusText}>{data.tradingOn ? 'Ao Vivo' : 'Ultimo Trade'}</Text>
        {data.tradingOn && <Foundation name='record' size={22} color='red' />}

      </View>
      <View style={styles.tradeBox}>
        <View style={styles.tradeColumn}>
          <Text style={styles.tradeLabel}>StopLoss:</Text>
          <Text style={{ ...styles.tradeValue, color: theme.colors.failed }}>{data.stopMarketPrice || '0.00'}</Text>
          <Text style={styles.percentage}>0.00%</Text>
        </View>
        <View style={[styles.tradeColumn, styles.center]}>
          <Text style={styles.tradeLabel}>Entrada:</Text>
          <Text style={styles.tradeValue}>{data.entryPrice || '0.00'}</Text>
        </View>
        <View style={[styles.tradeColumn, styles.right]}>
          <Text style={styles.tradeLabel}>Take Profit:</Text>
          <Text style={{ ...styles.tradeValue, color: theme.colors.success }}>{data.takeProfitPrice || '0.00'}</Text>
          <Text style={styles.percentage}>0.00%</Text>
        </View>
      </View>
    </View>
  )
}

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
  tradeBox: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: theme.colors.button,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6
  },
  tradeColumn: {
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
    fontSize: 16,
    color: '#ffffff'
  },
  tradeValue: {
    fontSize: 18,
    color: '#ffffff'
  },
  percentage: {
    fontSize: 14,
    color: '#fff'
  }
})

export default Trade