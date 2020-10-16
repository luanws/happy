import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import mapMarker from './src/images/map-marker.png'

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: -27.2092052,
            longitude: -49.6401092
          }}
          calloutAnchor={{ x: 2.4, y: 0.8 }}
        >
          <Callout tooltip onPress={() => { alert('oi') }}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Nome do orfanato</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  calloutContainer: {
    width: 160,
    height: 55,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14
  }
})
