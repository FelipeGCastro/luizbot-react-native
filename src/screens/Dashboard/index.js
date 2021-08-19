import React from 'react'

import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'

import TradeComponent from './Trade'
import Account from './Account'
import { getCorrectContext } from '../../helpers'
import theme from '../../global/styles/theme'
// import SwipeButton from 'rn-swipe-button'
import TradeHistory from './TradeHistory'

const Dashboard = ({ navigation, account }) => {
  const context = getCorrectContext(account)
  const { loadingData } = context()
  return (
    <SafeAreaView style={styles.container}>
      <TradeComponent account={account} />
      <View style={styles.marketSwipe} />
      {/* <SwipeButton
        railBackgroundColor={theme.colors.button}
        railFillBackgroundColor={theme.colors.swipeColor}
        titleColor='#fff'
        title='Delize/Market'
        titleFontSize={16}
        railBorderColor={theme.colors.display}
        thumbIconBorderColor={theme.colors.display}
        thumbIconBackgroundColor={theme.colors.swipeColor}
        icon
      /> */}
      {loadingData && <ActivityIndicator color='#fff' size='large' />}
      <View style={styles.tradeBody}>
        <Account account={account} navigation={navigation} />
        <TradeHistory account={account} navigation={navigation} />

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
