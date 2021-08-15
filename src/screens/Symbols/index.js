import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, ToastAndroid, TouchableOpacity, Text, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import theme from '../../global/styles/theme'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { callGetApi } from '../../services/helpers'
import { useAuth } from '../../hooks/auth'

const Symbols = ({ Symbols = [], route }) => {
  const { signOut } = useAuth()
  const [arraySymbols, setArraySymbols] = useState([])
  const [selectedSymbols, setSelectedSymbols] = useState([])
  const [selectedSymbolsObj, setSelectedSymbolsObj] = useState([])

  useEffect(() => {
    const { symbols } = route.params
    setSelectedSymbols(symbols)
    async function getSymbolsData () {
      const symbolsStoraged = await AsyncStorage.getItem('@luizbot:symbols')
      if (symbolsStoraged) {
        const symbolsParsed = JSON.parse(symbolsStoraged)
        const arrayWithId = []
        symbolsParsed.forEach((symbol, i) => {
          arrayWithId.push(symbol)
        })
        setSymbolsWithId(arrayWithId)
      } else {
        getSymbols()
      }
    }
    getSymbolsData()
  }, [])

  async function getSymbols () {
    const symbolsFetched = await callGetApi('/account/symbols', null, signOut)
    await AsyncStorage.setItem('@luizbot:symbols', JSON.stringify(symbolsFetched))
    setSymbolsWithId(symbolsFetched)
  }

  async function setSymbolsWithId (symbols) {
    const arrayWithId = []
    symbols.forEach((symbol, i) => {
      arrayWithId.push({ symbol })
    })
    setArraySymbols(arrayWithId)
  }
  function handleSelectedSymbols (symbols) {
    if (symbols.length > 5) {
      ToastAndroid.showWithGravity('Já selecionou 5', ToastAndroid.SHORT, ToastAndroid.CENTER)
      return
    }
    setSelectedSymbols(symbols)
  }
  function handleSelectedObj (symbolsObj) {
    if (symbolsObj.length > 5) {
      return
    }
    setSelectedSymbolsObj(symbolsObj)
  }

  function handleSavePress () {
    let symbolsText = ''
    selectedSymbolsObj.forEach((symbolObj, i) => {
      symbolsText = symbolsText.concat(i === 0 ? symbolObj.symbol : `, ${symbolObj.symbol}`)
    })
    Alert.alert('Adicionar Moedas?', symbolsText, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      { text: 'OK', onPress: () => {} }
    ])
  }
  return (
    <SafeAreaView style={styles.Container}>
      <SectionedMultiSelect
        items={arraySymbols}
        uniqueKey='symbol'
        styles={style}
        displayKey='symbol'
        selectText='Escolha os Simbolos'
        onSelectedItemsChange={(selecteds) => handleSelectedSymbols(selecteds)}
        onSelectedItemObjectsChange={(selecteds) => handleSelectedObj(selecteds)}
        IconRenderer={MaterialIcons}
        selectedItems={selectedSymbols}
      />
      <TouchableOpacity style={styles.saveButton} onPress={() => handleSavePress()}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

// container modalWrapper backdrop listContainer
// selectToggle
// selectToggleText
// item
// selectedItem
// subItem
// itemText selectedItemText
// selectedSubItemText selectedSubItem subItemText
// searchBar
// center
// separator
// subSeparator
// chipsWrapper
// chipContainer parentChipContainer parentChipText chipText
// chipIcon
// searchTextInput
// scrollView
// button
// confirmText
// cancelButton
// itemIconStyle

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginHorizontal: 10,
    height: 50,
    backgroundColor: theme.colors.success,
    marginBottom: 20
  },
  saveButtonText: {
    fontSize: 20,
    color: '#fff'
  }
})
const style = StyleSheet.create({
  selectToggle: {
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 17,
    borderRadius: 4,
    backgroundColor: theme.colors.button
  },
  selectToggleText: {
    color: '#fff',
    fontSize: 18
  },
  itemText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'normal'
  },
  selectedItemText: {
    color: '#666',
    fontSize: 18
  }

})
export default Symbols
