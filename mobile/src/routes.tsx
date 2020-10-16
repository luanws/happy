import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import OrphanagesMap from './pages/OrphanagesMap'
import { NavigationContainer } from '@react-navigation/native'
import OrphanageDetails from './pages/OrphanageDetails'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import Header from './components/Header'

const Routes: React.FC = () => {
  const { Navigator, Screen } = createStackNavigator()

  return (
    <NavigationContainer>
      <Navigator screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#f2f3f5'
        },
      }}>
        <Screen
          name="OrphanagesMap"
          component={OrphanagesMap}
        />

        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
          options={{
            headerShown: true,
            header: () => <Header title="Orfanato" />
          }}
        />

        <Screen
          name="OrphanageData"
          component={OrphanageData}
          options={{
            headerShown: true,
            header: () => <Header showCancel title="Selecione no mapa" />
          }}
        />

        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <Header showCancel title="Informe os dados" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes