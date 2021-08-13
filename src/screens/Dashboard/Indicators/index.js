import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const Indicators = ({ lastIndicatorsData }) => {
  const time = lastIndicatorsData?.time ? new Date(lastIndicatorsData.time) : new Date()
  const renderEma = (ema, i) => {
    return <Text key={i} style={styles.text}>EMA{ema}: {lastIndicatorsData.ema[ema]}</Text>
  }
  const renderStoch = (stoch, i) => {
    return <Text key={i} style={styles.textKAndD}>{i === 0 ? 'K' : 'D'}: {stoch}</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.indicContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Ema:</Text>
          <View style={styles.kAndDContainer}>
            {lastIndicatorsData?.ema && Object.keys(lastIndicatorsData.ema).map(renderEma)}
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.text}>Rsi:</Text>
          {lastIndicatorsData?.rsi && <Text style={styles.textValue}>{lastIndicatorsData.rsi}</Text>}
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Stoch:</Text>
          <View style={styles.kAndDContainer}>
            {lastIndicatorsData?.stoch && lastIndicatorsData.stoch.map(renderStoch)}
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.text}>Time:</Text>
          <Text style={styles.textValue}>{time.getHours()}:{time.getMinutes()}</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  indicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text: {
    color: '#fff',
    fontSize: 12
  },
  textValue: {
    color: '#fff',
    fontSize: 10,
    alignSelf: 'center'
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  kAndDContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5
  },
  textKAndD: {
    color: '#fff',
    fontSize: 10,
    marginHorizontal: 2
  }
})

export default Indicators
