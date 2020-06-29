
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image, View } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import useAxios from 'axios-hooks'
import TripCard from '../../partials/TripCard';
import LoadingSpinner from '../../partials/LoadingSpinner';


export default () => {
    const navigation = useNavigation();
    const route = useRoute();
    const returnAddressString = `${route.params.pLocationAddress._.replace(/ /g, '+')}${route.params.pLocationAddress.CountryName[0].Name[0]}`

    const [originLocationReq, refecthOrigin] = useAxios({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${route.params.pickupLocation.replace(` `, '+')}&key=AIzaSyBJ8evu2aDcSyb2F2NIuNQ3L5TeLAGpino`,
    })

    const [returnLocationReq, refetchReturn] = useAxios({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${returnAddressString}&key=AIzaSyBJ8evu2aDcSyb2F2NIuNQ3L5TeLAGpino`,
    })

    useFocusEffect(
        React.useCallback(() => {
            refecthOrigin()
            refetchReturn();

        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Layout style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '5%' }}>
                <TripCard
                    displayPreview={true}
                    {...route.params}
                />
            </Layout>
            <View style={{ display: 'flex', height: '50%' }}>
                {(originLocationReq.data && returnLocationReq.data && !originLocationReq.loading && !returnLocationReq.loading) && <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: originLocationReq.data.results[0].geometry.location.lat,
                        longitude: originLocationReq.data.results[0].geometry.location.lng,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05
                    }}
                >
                    <MapViewDirections
                        origin={{
                            latitude: originLocationReq.data.results[0].geometry.location.lat,
                            longitude: originLocationReq.data.results[0].geometry.location.lng
                        }}
                        destination={{
                            latitude: returnLocationReq.data.results[0].geometry.location.lat,
                            longitude: returnLocationReq.data.results[0].geometry.location.lng
                        }}
                        strokeWidth={2}
                        strokeColor={'#FB4A46'}
                        lineCap={'round'}
                        apikey={'AIzaSyBJ8evu2aDcSyb2F2NIuNQ3L5TeLAGpino'}
                    />
                </MapView>}


                {originLocationReq.loading && returnLocationReq.loading && (
                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text category="h2">Loading your route...</Text>
                        <LoadingSpinner />
                    </View>
                )}

                {(originLocationReq.error || returnLocationReq.error) && (
                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text category="h2">We could not load your route</Text>
                    </View>
                )}
                {(originLocationReq.data && returnLocationReq.data && !originLocationReq.loading && !returnLocationReq.loading) && <Button onPress={() => {

                }} size="small" style={{ position: 'absolute', right: 0, marginTop: '2%', marginLeft: '2%', borderRadius: 10, backgroundColor: '#cf1830', borderColor: '#cf1830', width: '30%' }}>
                    {() => <Text style={{ color: 'white' }}>HELP</Text>}
                </Button>}
            </View>

        </SafeAreaView>
    )
};
