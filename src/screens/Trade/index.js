import React from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import theme from '../../global/styles/theme'
import { format } from 'date-fns'

// import { Container } from './styles';

const Trade = ({ route }) => {
  const { trade } = route.params
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Symbolo:</Text>
        <Text style={styles.value}>{trade.symbol}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Estratégia:</Text>
        <Text style={styles.value}>{trade.strategy}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Side:</Text>
        <Text style={styles.value}>{trade.side}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Preço do Stop Loss:</Text>
        <Text style={styles.value}>{trade.stopPrice}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Preço da Entrada:</Text>
        <Text style={styles.value}>{trade.entryPrice}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Preço Saida:</Text>
        <Text style={styles.value}>{trade.profitPrice}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Quantidade:</Text>
        <Text style={styles.value}>{trade.quantity}</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Lucro/prejuizo:</Text>
        <Text style={{
          ...styles.value,
          color: Number(trade.profit) < 0 ? theme.colors.failed : theme.colors.success
        }}
        >{trade.profit}
        </Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.label}>Data e Hora:</Text>
        <Text style={styles.value}>{format(new Date(trade.timestamp), 'dd/mm/yyyy kk:mm')}</Text>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 20
  },
  infoWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  label: {
    color: '#fff',
    marginHorizontal: 5,
    fontSize: 16
  },
  value: {
    color: theme.colors.normal,
    fontSize: 16
  }
})
export default Trade
