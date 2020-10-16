import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface Props {
  title: string
  showCancel?: boolean
}

const Header: React.FC<Props> = (props) => {
  const navigation = useNavigation()

  const navigateToHomePage = () => navigation.navigate('OrphanagesMap')

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>{props.title}</Text>

      {props.showCancel ? (
        <BorderlessButton onPress={navigateToHomePage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : <View style={{ width: 24 }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingVertical: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: 'nunito600',
    color: '#8fa7b3',
    fontSize: 16,
  }
})

export default Header