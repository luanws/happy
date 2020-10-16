import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import OrphanagesMap from './pages/OrphanagesMap'
import { NavigationContainer } from '@react-navigation/native'
import OrphanageDetails from './pages/OrphanageDetails'

const Routes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator()

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Screen name="OrphanageDetails" component={OrphanageDetails} />
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes