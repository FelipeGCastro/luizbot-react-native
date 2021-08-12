import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'

import TradeComponent from './trade'
import { Feather } from '@expo/vector-icons'

import theme from '../../global/styles/theme'
import SwipeButton from 'rn-swipe-button'
import data from './data'

const Dashboard = () => {
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
      <View style={styles.tradeBody}>
        <View style={styles.tradeAccountContainer}>
          <TouchableOpacity activeOpacity={0.70} style={styles.tradeOnContainer}>
            <Feather name='power' size={24} color={theme.colors.success} />
            <Text style={styles.tradOnText}>Ligado</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Simbolo:</Text>
            <Text style={[styles.optionValue, styles.symbol]}>BTCUSDT</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Estratégia:</Text>
            <Text style={[styles.optionValue, styles.strategy]}>Hidden Divergence</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Total Ganho:</Text>
            <Text style={styles.optionValue}>200%</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Alavancagem:</Text>
            <Text style={styles.optionValue}>2x</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Valor Entrada:</Text>
            <Text style={styles.optionValue}>$ 80,00</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.70} style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Saldo:</Text>
            <Text style={styles.optionValue}>$ 40,00</Text>
          </TouchableOpacity>
        </View>
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
