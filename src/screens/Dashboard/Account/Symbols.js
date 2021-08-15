import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'

// import { Container } from './styles';

const Symbols = ({ symbols = [], styles, pushToSymbols }) => {
  const [symbolsText, setSymbolsText] = useState()
  useEffect(() => {
    let symbolsText = ''
    symbols.forEach((symbol, i) => {
      symbolsText = symbolsText.concat(i === 0 ? symbol : `, ${symbol}`)
    })
    setSymbolsText(symbolsText)
  }, [symbols])
  return (
    <>
      <TouchableOpacity
        onPress={() => pushToSymbols()}
        activeOpacity={0.70}
        style={{ ...styles.optionContainer, marginBottom: 0, marginTop: 20 }}
      >
        <Text style={styles.optionLabel}>Simbolo:</Text>
        <Text style={[styles.optionValue, styles.symbols]}>{symbolsText}</Text>

      </TouchableOpacity>
    </>
  )
}

export default Symbols
