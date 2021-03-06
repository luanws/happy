import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import MapView, { MapEvent, Marker } from 'react-native-maps'

import mapMarkerImg from '../../images/map-marker.png'

interface MapPosition {
  latitude: number
  longitude: number
}

export default function SelectMapPosition() {
  const navigation = useNavigation()

  const [position, setPosition] = useState<MapPosition | undefined>(undefined)

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position })
  }

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate)
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -30.0329124,
          longitude: -52.9056103,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position !== undefined && (
          <Marker
            icon={mapMarkerImg}
            coordinate={position}
          />
        )}
      </MapView>

      {position !== undefined && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'nunito800',
    fontSize: 16,
    color: '#FFF',
  }
})