
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCreateBookingState } from './CreateBookingState';
import moment from 'moment';
import TripCard from '../../../partials/TripCard';
import ResolveCurrencySymbol from '../../../utils/ResolveCurrencySymbol';


export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [departureTime] = useCreateBookingState("departureTime");
    const [returnTime] = useCreateBookingState("returnTime");
    const [originLocation] = useCreateBookingState("originLocation");
    const [returnLocation] = useCreateBookingState("returnLocation");

    const [babySeat, setBabySeat] = useCreateBookingState("babySeat");
    const [childSeat, setChildSeat] = useCreateBookingState("childSeat");
    const [seatBooster, setSeatBooster] = useCreateBookingState("seatBooster");
    const [wifi, setWifi] = useCreateBookingState("wifi");
    const [gps, setGps] = useCreateBookingState("gps");
    const [vehicle] = useCreateBookingState("vehicle");

    const items = []

    if (babySeat) {
        items.push({
            "name": `Baby Seat`,
            "description": `A baby seat`,
            "quantity": "1",
            "price": 10,
            "tax": "0",
            "sku": "1",
            "currency": vehicle.currency || "USD"
        })
    }
    if (childSeat) {
        items.push({
            "name": `Child Seat`,
            "description": `A child seat`,
            "quantity": "1",
            "price": 10,
            "tax": "0",
            "sku": "1",
            "currency": vehicle.currency || "USD"
        })
    }
    if (seatBooster) {
        items.push({
            "name": `Seat Booster`,
            "description": `A seat booster`,
            "quantity": "1",
            "price": 10,
            "tax": "0",
            "sku": "1",
            "currency": vehicle.currency || "USD"
        })
    }
    if (wifi) {
        items.push({
            "name": `Wifi`,
            "description": `a car with WIFI`,
            "quantity": "1",
            "price": 10,
            "tax": "0",
            "sku": "1",
            "currency": vehicle.currency || "USD"
        })
    }
    if (gps) {
        items.push({
            "name": `GPS`,
            "description": `a car with GPS`,
            "quantity": "1",
            "price": 10,
            "tax": "0",
            "sku": "1",
            "currency": vehicle.currency || "USD"
        })
    }

    const totalToCharge = parseFloat(vehicle.price) + items.reduce((prev, next) => {
        prev = prev + next.price
        return prev
    }, 0)

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <TripCard
                        tripDate={moment(departureTime)}
                        pickupLocation={originLocation?.locationname}
                        pickupTime={moment(departureTime)}
                        dropOffLocation={returnLocation?.locationname}
                        dropoffTime={moment(returnTime)}

                        carName={vehicle.name}
                        finalCost={totalToCharge}
                        currencyCode={vehicle.currency}
                        arrivalTime={moment(returnTime)}
                        image_preview_url={vehicle.image_preview_url}

                        leftImageUri={vehicle.supplier_logo}
                    />

                    <Text style={{ textAlign: 'center', color: '#d1021b', fontSize: 22 }}>DURATION {moment(returnTime).diff(moment(departureTime), 'hour')} Hrs - Mileage 23 Miles</Text>
                    <Text style={{ textAlign: 'center', color: '#d1021b', fontSize: 22 }}> TOTAL COST OF RENTAL {ResolveCurrencySymbol(vehicle.currency)} {totalToCharge} </Text>

                    <Layout style={{ position: 'relative',display: 'flex', alignItems: 'center', justifyContent: 'flex-end',height: 280}}>
                        <Image source={require('../../../image/map.jpg')} style={{ position: 'absolute',flex: 1, width: 280, height: 280, resizeMode: 'contain' }} />
                        <Text style={{ textAlign: 'center', color: '#d1021b', fontSize: 22 }}>
                            WHEN DEPARTING THE VEHICLE
                            PLEASE MAKE SURE YOU
                            COLLECT ALL YOUR BELONGING
                        </Text>
                    </Layout>


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
