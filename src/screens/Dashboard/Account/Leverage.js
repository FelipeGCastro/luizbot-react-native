import React, { useRef } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const leverages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const Leverage = ({ leverage, styles, setLeverageValue }) => {
  const pickerRef = useRef()
  return (
    <>
      <Picker
        selectedValue={leverage}
        ref={pickerRef}
        onValueChange={(itemValue, itemIndex) => setLeverageValue(itemValue)}
      >
        {leverages.map((leverage, i) => <Picker.Item key={i} label={`${leverage}x`} value={leverage} />)}
      </Picker>

      <TouchableOpacity onPress={() => pickerRef.current.focus()} activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Alavancagem:</Text>
        <Text style={styles.optionValue}>{leverage}x</Text>
      </TouchableOpacity>
    </>
  )
}

export default Leverage
