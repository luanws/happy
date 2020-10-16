import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import OrphanagesMap from './pages/orphanages-map'
import { NavigationContainer } from '@react-navigation/native'

const Routes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator()

  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="OrphanagesMap" component={OrphanagesMap} />
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes