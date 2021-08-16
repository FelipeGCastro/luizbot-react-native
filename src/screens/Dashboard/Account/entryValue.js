import React, { useRef } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const entriesValues = [40, 60, 80, 100, 150, 180, 200, 250, 300, 400, 500, 600, 800]

const EntryValue = ({ entryValue, styles, setEntryValueValue }) => {
  const pickerRef = useRef()
  return (
    <>
      <Picker
        selectedValue={entryValue}
        ref={pickerRef}
        onValueChange={(itemValue, itemIndex) => setEntryValueValue(itemValue)}
      >
        {entriesValues.map((value, i) => <Picker.Item key={i} label={`$ ${Number(value).toFixed(2)}`} value={value} />)}
      </Picker>

      <TouchableOpacity onPress={() => pickerRef.current.focus()} activeOpacity={0.70} style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Valor Entrada:</Text>
        <Text style={styles.optionValue}>$ {Number(entryValue).toFixed(2)}</Text>
      </TouchableOpacity>
    </>
  )
}

export default EntryValue
