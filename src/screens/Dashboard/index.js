import React from 'react'

import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'

import TradeComponent from './Trade'
import Account from './Account'

import theme from '../../global/styles/theme'
import SwipeButton from 'rn-swipe-button'
import TradeHistory from './TradeHistory'
import { useAccountData } from '../../hooks/accountdata'

const Dashboard = ({ navigation }) => {
  const { loadingData } = useAccountData()

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
      {loadingData && <ActivityIndicator color='#fff' size='large' />}
      <View style={styles.tradeBody}>
        <Account navigation={navigation} />
        <TradeHistory />

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
  }

})

export default Dashboard
