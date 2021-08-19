import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

const STRATEGIES = {
  sharkStrategy: 'Tubarão',
  hiddenDivergence: 'Hidden Divergence'
}

const Strategies = ({ strategy, strategies, styles, pickerStrategyRef, setStrategyValue }) => {
  if (strategies && Object.keys(strategies).length === 0) {
    return null
  } else {
    return (
      <>
        <Picker
          selectedValue={strategy}
          ref={pickerStrategyRef}
          onValueChange={(itemValue, itemIndex) => setStrategyValue(itemValue)}
        >
          {strategies && Object.keys(strategies).map((strategy, i) => <Picker.Item key={i} label={STRATEGIES[strategies[strategy]]} value={strategies[strategy]} />)}
        </Picker>
        <TouchableOpacity
          onPress={() => pickerStrategyRef.current.focus()}
          activeOpacity={0.70}
          style={styles.optionContainer}
        >
          <Text style={styles.optionLabel}>Estratégia:</Text>
          <Text style={[styles.optionValue, styles.strategy]}>{STRATEGIES[strategy]}</Text>
        </TouchableOpacity>
      </>
    )
  }
}

export default Strategies
