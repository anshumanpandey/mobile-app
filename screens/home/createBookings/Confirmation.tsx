
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCreateBookingState } from './CreateBookingState';
import TimeCheckbox from '../../../partials/TimeCheckbox';
import LocationSearchInput from '../../../partials/SearchLocationInput';
import BuildJson from '../../../utils/BuildJson';
import useAxios from 'axios-hooks'
import moment from 'moment';
import { GRCGDS_BACKEND } from 'react-native-dotenv';
import LoadingSpinner from '../../../partials/LoadingSpinner';
import CarItem from '../../../partials/CarItem';
import CarTripInfoCard from '../../../partials/CarTripInfoCard';


export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [departureTime] = useCreateBookingState("departureTime");
    const [returnTime] = useCreateBookingState("returnTime");
    const [originLocation] = useCreateBookingState("originLocation");
    const [returnLocation] = useCreateBookingState("returnLocation");

    const [, setBabySeat] = useCreateBookingState("babySeat");
    const [, setChildSeat] = useCreateBookingState("childSeat");
    const [, setSeatBooster] = useCreateBookingState("seatBooster");
    const [, setWifi] = useCreateBookingState("wifi");
    const [, setGps] = useCreateBookingState("gps");
    const [vehicle] = useCreateBookingState("vehicle");

    console.log(returnLocation)

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <CarTripInfoCard
                        tripDate={moment(departureTime)}
                        pickupLocation={originLocation?.internalcode}
                        pickupTime={moment(departureTime)}
                        dropOffLocation={returnLocation?.internalcode}
                        dropoffTime={moment(returnTime)}
                      
                        carName={vehicle.name}
                        registratioNumber={"RC00786587"}
                        finalCost={vehicle.price}
                        arrivalTime={moment(returnTime)}
                        image_preview_url={vehicle.image_preview_url}
                      
                        leftImageUri={vehicle.supplier_logo}
                      
                        reservationNumber={"0000"}
                      
                    />


                    <Layout style={{ marginTop: '5%' }}>
                        <Button
                            onPress={() => navigation.navigate('MyBookings')}
                            size="giant" style={{
                                borderRadius: 10,
                                backgroundColor: '#41d5fb',
                                borderColor: '#41d5fb',
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginBottom: '2%'
                            }}>
                            {() => <Text style={{ color: 'white', fontFamily: 'SF-UI-Display_Bold', fontSize: 18 }}>Go My Trips</Text>}
                        </Button>
                    </Layout>
                </Layout>
            </ScrollView >

        </SafeAreaView>
    )
};
