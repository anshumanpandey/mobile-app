
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import CarTripInfoCard from '../../partials/CarTripInfoCard';
import TripCard from '../../partials/TripCard';


export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Layout style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '5%' }}>
                <TripCard
                    displayPreview={true}
                    {...route.params}
                />
            </Layout>
            <View style={{ display: 'flex', height: '50%' }}>
                {/*<Image source={require('../../image/map.jpg')} style={{ alignSelf: 'center', position: 'absolute', zIndex: -2, }} />*/}
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.3318456,
                        longitude: -122.0296002,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                >
                    <MapViewDirections
                        origin={{latitude: 37.3318456, longitude: -122.0296002}}
                        destination={{latitude: 37.771707, longitude: -122.4053769}}
                        apikey={'AIzaSyBJ8evu2aDcSyb2F2NIuNQ3L5TeLAGpino'}
                    />
                </MapView>
                <Button onPress={() => {

                }} size="small" style={{ marginTop: '2%', marginLeft: '2%', borderRadius: 10, backgroundColor: '#cf1830', borderColor: '#cf1830', width: '30%' }}>
                    {() => <Text style={{ color: 'white' }}>HELP</Text>}
                </Button>
            </View>

        </SafeAreaView>
    )
};
