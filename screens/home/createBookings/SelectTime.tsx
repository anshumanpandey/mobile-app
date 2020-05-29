
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { useNavigation } from '@react-navigation/native';
import { useCreateBookingState } from './CreateBookingState';
import TimeCheckbox from '../../../partials/TimeCheckbox';
import LocationSearchInput from '../../../partials/SearchLocationInput';
import BuildJson from '../../../utils/BuildJson';
import useAxios from 'axios-hooks'
import moment from 'moment';
import { GRCGDS_BACKEND } from 'react-native-dotenv';
import LoadingSpinner from '../../../partials/LoadingSpinner';


export default () => {
    const navigation = useNavigation();
    const [originLocation, setOriginLocation] = useCreateBookingState("originLocation");
    const [returnLocation, setReturnLocation] = useCreateBookingState("returnLocation");
    const [inmediatePickup, setInmediatePickup] = useCreateBookingState("inmediatePickup");
    const [departureTime, setDepartureTime] = useCreateBookingState("departureTime");
    const [returnTime, setReturnTime] = useCreateBookingState("returnTime");

    const [{ data, loading, error }, doSearch] = useAxios({
        url: `${GRCGDS_BACKEND}/vehicle/search`,
        method: 'GET'
    }, { manual: true })

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <LocationSearchInput
                        onOriginLocationSelected={(l) => {
                            setOriginLocation(l)
                            setReturnLocation(l)
                        }}
                        onReturnLocationSelected={(l) => setReturnLocation(l)}
                    />
                    <TimeCheckbox
                        checked={inmediatePickup == undefined ? undefined : inmediatePickup}
                        style={{ marginBottom: '5%' }}
                        title="IMMEDIATE PICK-UP"
                        subTitle="Get a ride in a minute"
                        onChange={(v) => setInmediatePickup(p => {
                            if (p === null) return true
                            return !p
                        })}
                    />
                    <TimeCheckbox
                        checked={inmediatePickup == undefined ? undefined : !inmediatePickup}
                        title="SCHEDULE RIDE"
                        subTitle="Schedule pickup in advance"
                        onChange={(v) => {
                            setInmediatePickup(p => {
                                if (p === null) return false
                                return !p
                            })
                        }}
                    />
                    {inmediatePickup === false && (
                        <>
                            <DatePicker
                                date={departureTime}
                                onDateChange={(d) => setDepartureTime(d)}
                            />
                            <Text style={{ fontFamily: 'SF-UI-Display_Bold' }}>Return Time</Text>
                            <DatePicker
                                date={returnTime}
                                onDateChange={(d) => setReturnTime(d)}
                            />
                        </>
                    )}
                </Layout>
                <Layout style={{ marginTop: '5%' }}>
                    <Button
                        disabled={originLocation == null || inmediatePickup == null || loading == true}
                        accessoryRight={loading ? LoadingSpinner : undefined}
                        onPress={() => {
                            console.log(originLocation)
                            console.log(returnLocation)
                            if (!originLocation) return

                            doSearch({
                                params: {
                                    module_name: "SEARCH_VEHICLE",

                                    pickup_date: moment(departureTime).format(`DD-MM-YYYY`),
                                    pickup_time: moment(departureTime).format(`HH:ss`),

                                    dropoff_date: moment(returnTime).format(`DD-MM-YYYY`),
                                    dropoff_time: moment(returnTime).format(`HH:ss`),

                                    pickup_location: originLocation.Branchid,
                                    dropoff_location: returnLocation ? returnLocation.Branchid : originLocation.Branchid,
                                }
                            })
                                .then(res => {
                                    navigation.navigate(
                                        'CarsList',
                                        {
                                            cars: res.data.scrape.vehicle,
                                            metadata: res.data.scrape.details,
                                            searchParams: {
                                                pickUpDate: moment(departureTime),
                                                pickUpTime: moment(departureTime),

                                                dropOffDate: moment(returnTime),
                                                dropOffTime: moment(returnTime),

                                                pickUpLocation: originLocation,
                                                dropOffLocation: returnLocation ? returnLocation : originLocation,
                                            }
                                        }
                                    );
                                })
                        }} size="giant" style={{
                            borderRadius: 10,
                            backgroundColor: (originLocation != null && inmediatePickup != null) && loading == false ? '#41d5fb' : '#e4e9f2',
                            borderColor: (originLocation != null && inmediatePickup != null) && loading == false ? '#41d5fb' : '#e4e9f2',
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginBottom: '2%'
                        }}>
                        {() => <Text style={{ color: loading ? "#ACB1C0" : 'white', fontFamily: 'SF-UI-Display_Bold', fontSize: 18 }}>Search</Text>}
                    </Button>
                </Layout>
            </ScrollView >

        </SafeAreaView>
    )
};
