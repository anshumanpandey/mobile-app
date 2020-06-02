
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

    const [extras] = useCreateBookingState("extras");
    const [vehicle] = useCreateBookingState("vehicle");

    const totalToCharge = parseFloat(vehicle?.TotalCharge.RateTotalAmount || '0.0') + extras.reduce((prev, next) => {
        prev = prev + parseFloat(next.Charge.Amount)
        return prev
    }, 0)

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <TripCard
                        pickupLocation={originLocation?.Branchname || ''}
                        pickupTime={moment(departureTime)}
                        dropOffLocation={returnLocation?.Branchname || ''}
                        dropoffTime={moment(returnTime)}

                        carName={vehicle?.Vehicle.VehMakeModel.Name || 'Car'}
                        finalCost={totalToCharge.toString()}
                        currencyCode={vehicle?.TotalCharge.CurrencyCode || 'USD'}
                        arrivalTime={moment(returnTime)}
                        image_preview_url={vehicle?.Vehicle.VehMakeModel.PictureURL}

                        leftImageUri={''}
                        keyLess={false}
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
