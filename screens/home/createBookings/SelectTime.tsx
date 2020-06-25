
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, List, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, View, TouchableHighlight, TouchableWithoutFeedback, Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker'
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import { useCreateBookingState } from './CreateBookingState';
import TimeCheckbox from '../../../partials/TimeCheckbox';
import LocationSearchInput from '../../../partials/SearchLocationInput';
import Modal from 'react-native-modal';
import useAxios from 'axios-hooks'
import moment from 'moment';
import { GRCGDS_BACKEND } from 'react-native-dotenv';
import LoadingSpinner from '../../../partials/LoadingSpinner';
import { VehicleResponse } from '../../../types/SearchVehicleResponse';


export default () => {
    const navigation = useNavigation();
    const [originLocation, setOriginLocation] = useCreateBookingState("originLocation");
    const [returnLocation, setReturnLocation] = useCreateBookingState("returnLocation");
    const [inmediatePickup, setInmediatePickup] = useCreateBookingState("inmediatePickup");
    const [departureTime, setDepartureTime] = useCreateBookingState("departureTime");
    const [returnTime, setReturnTime] = useCreateBookingState("returnTime");
    const [result, setResults] = useState(null);
    const [searchingFor, setSearchingFor] = useState("ORIGIN");

    const [{ data, loading, error }, doSearch] = useAxios<VehicleResponse>({
        url: `${GRCGDS_BACKEND}/SEARCH_VEHICLE`,
        method: 'GET'
    }, { manual: true })

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <LocationSearchInput
                        pickupLocation={originLocation}
                        returnLocation={returnLocation}
                        onResultChange={(results, type) => {
                            setResults(results)
                            setSearchingFor(type)
                        }}
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
                                minuteInterval={30}
                                date={departureTime}
                                onDateChange={(d) => setDepartureTime(d)}
                            />
                            <Text style={{ fontFamily: 'SF-UI-Display_Bold' }}>Return Time</Text>
                            <DatePicker
                                minuteInterval={30}
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
                            if (!originLocation) return

                            doSearch({
                                params: {
                                    module_name: "SEARCH_VEHICLE",

                                    pickup_date: moment(departureTime).format(`YYYY-MM-DD`),
                                    pickup_time: moment(departureTime).format(`HH:ss`),

                                    dropoff_date: moment(returnTime).format(`YYYY-MM-DD`),
                                    dropoff_time: moment(returnTime).format(`HH:ss`),

                                    pickup_location: originLocation.internalcode,
                                    dropoff_location: returnLocation ? returnLocation.internalcode : originLocation.internalcode,
                                }
                            })
                                .then(res => {
                                    navigation.navigate(
                                        'CarsList',
                                        {
                                            cars: res.data.VehAvailRSCore.VehVendorAvails,
                                            metadata: res.data.VehAvailRSCore.VehRentalCore,
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
                <Modal
                    coverScreen={false}
                    hasBackdrop={false}
                    isVisible={result != null}
                    style={{
                        margin: 0,
                        justifyContent: 'flex-end',
                        flexGrow: 3,
                    }}>

                    <List
                        keyboardShouldPersistTaps={"handled"}
                        data={result}
                        style={{ maxHeight: '30%' }}
                        renderItem={(data: any) => {
                            let extraStyles = {}
                            if (data.index == 0) {
                                extraStyles = {
                                    borderTopRightRadius: 30, borderTopLeftRadius: 30
                                }
                            }
                            return (
                                <TouchableHighlight onPress={(el) => {
                                    console.log(searchingFor)
                                    if (searchingFor == "ORIGIN") setOriginLocation(data.item)
                                    if (searchingFor == "RETURN") setReturnLocation(data.item)
                                    setResults(null)
                                }} >
                                    <Layout style={{ display: 'flex', flexDirection: 'row', borderBottomColor: '#E4E9F2', borderBottomWidth: 1, paddingBottom: '5%', paddingTop: '5%' }}>
                                        <EvilIcon style={{ color: '#41D5FB' }} name="location" size={32} />
                                        <Text style={{ fontSize: 18 }}>{data.item.locationname}</Text>
                                    </Layout>
                                </TouchableHighlight>
                            );
                        }}
                    />
                </Modal>
            </ScrollView >
        </SafeAreaView>
    )
};
