import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

// import { Container } from './styles';

const Symbol = ({ symbol, symbols, pickerRef, styles, setSymbolValue }) => {
  return (
    <>
      {symbols[0] && (
        <Picker
          selectedValue={symbol}
          ref={pickerRef}
          onValueChange={(itemValue, itemIndex) => setSymbolValue(itemValue)}
        >
          {symbols.map((symbol, i) => <Picker.Item key={i} label={symbol} value={symbol} />)}
        </Picker>
      )}

      <TouchableOpacity
        onPress={() => pickerRef.current.focus()}
        activeOpacity={0.70}
        style={{ ...styles.optionContainer, marginBottom: 0 }}
      >
        <Text style={styles.optionLabel}>Simbolo:</Text>
        <Text style={[styles.optionValue, styles.symbol]}>{symbol}</Text>

      </TouchableOpacity>
    </>
  )
}

export default Symbol
