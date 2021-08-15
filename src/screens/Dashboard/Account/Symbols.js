import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

// import { Container } from './styles';

const Symbols = ({ symbol, styles, pushToSymbols }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => pushToSymbols()}
        activeOpacity={0.70}
        style={{ ...styles.optionContainer, marginBottom: 0 }}
      >
        <Text style={styles.optionLabel}>Simbolo:</Text>
        <Text style={[styles.optionValue, styles.symbol]}>{symbol}</Text>

      </TouchableOpacity>
    </>
  )
}

export default Symbols
