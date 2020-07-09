
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, List, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, View, TouchableHighlight, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker'
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCreateBookingState } from './CreateBookingState';
import TimeCheckbox from '../../../partials/TimeCheckbox';
import LocationSearchInput from '../../../partials/SearchLocationInput';
// @ts-ignore
import GPSState from 'react-native-gps-state'
//@ts-ignore
import GetLocation from 'react-native-get-location'
// @ts-ignore
import SystemSetting from 'react-native-system-setting'
import useAxios from 'axios-hooks'
import moment from 'moment';
import { GRCGDS_BACKEND } from 'react-native-dotenv';
import LoadingSpinner from '../../../partials/LoadingSpinner';
import { VehicleResponse } from '../../../types/SearchVehicleResponse';
import MenuButton from '../../../partials/MenuButton';
import { checkMultiple, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { AppFontBold, AppFontRegular } from '../../../constants/fonts'


export default () => {
    const navigation = useNavigation();
    const [originLocation, setOriginLocation] = useCreateBookingState("originLocation");
    const [returnLocation, setReturnLocation] = useCreateBookingState("returnLocation");
    const [inmediatePickup, setInmediatePickup] = useCreateBookingState("inmediatePickup");
    const [departureTime, setDepartureTime] = useCreateBookingState("departureTime");
    const [returnTime, setReturnTime] = useCreateBookingState("returnTime");
    const [currentLocation, setCurrentLocation] = useState(null);

    const [{ data, loading, error }, doSearch] = useAxios<VehicleResponse>({
        url: `${GRCGDS_BACKEND}/SEARCH_VEHICLE`,
        method: 'GET',
        validateStatus: () => true
    }, { manual: true })

    useEffect(() => {
        if (inmediatePickup == true) {
            console.log("GPSState.isAuthorized()", GPSState.isAuthorized())
            if (!GPSState.isAuthorized()) {
                GPSState.requestAuthorization(GPSState.AUTHORIZED_WHENINUSE)
            }
            SystemSetting.isLocationEnabled()
                .then((enable: boolean) => {
                    if (enable == false) {
                        SystemSetting.switchLocation(() => { })
                    }
                })

            setDepartureTime(moment().toDate())
            setOriginLocation({
                internalcode: '32151',
                locationname: 'Current Location',
            })
        } else {
            setOriginLocation(null)
            setReturnLocation(null)
        }
    }, [inmediatePickup])

    useFocusEffect(
        React.useCallback(() => {
            checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE])
                .then((result) => {
                    switch (result["android.permission.ACCESS_FINE_LOCATION"]) {
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                        case RESULTS.DENIED:
                            console.log('The permission has not been requested / is denied but requestable');
                            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((r) => {
                                if (r == RESULTS.UNAVAILABLE) Alert.alert('This feature is not available (on this device / in this context)')
                                if (r == RESULTS.DENIED) Alert.alert(':(','Please, allow the location, for us to do amazing things for you!')
                                if (r == RESULTS.BLOCKED) Alert.alert(':(','Please, allow the location, for us to do amazing things for you!')
                            });
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            GetLocation.getCurrentPosition({
                                enableHighAccuracy: true,
                                timeout: 15000,
                            })
                                .then(location => {
                                    setCurrentLocation(location)
                                })
                                .catch(error => {
                                    const { code, message } = error;
                                    console.warn(code, message);
                                })
                            break;
                        case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            Alert.alert(':(','Please, allow the location, for us to do amazing things for you!')
                            break;
                    }

                    switch (result["ios.permission.LOCATION_WHEN_IN_USE"]) {
                        case RESULTS.UNAVAILABLE:
                            console.log(
                                'This feature is not available (on this device / in this context)',
                            );
                            break;
                        case RESULTS.DENIED:
                            console.log('The permission has not been requested / is denied but requestable');
                            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
                                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                                    if (result == RESULTS.UNAVAILABLE) Alert.alert('This feature is not available (on this device / in this context)')
                                    if (result == RESULTS.DENIED) Alert.alert(':(','Please, allow the location, for us to do amazing things for you!')
                                    if (result == RESULTS.BLOCKED) Alert.alert(':(','Please, allow the location, for us to do amazing things for you!')
                                });
                            });
                            break;
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            GetLocation.getCurrentPosition({
                                enableHighAccuracy: true,
                                timeout: 15000,
                            })
                                .then(location => {
                                    setCurrentLocation(location)
                                })
                                .catch(error => {
                                    const { code, message } = error;
                                    console.warn(code, message);
                                })
                            break;
                        case RESULTS.BLOCKED:
                            console.log('The permission is denied and not requestable anymore');
                            Alert.alert(':(','Please, allow the location, for us to do amazing things for you!')
                            break;
                    }
                })
                .catch((error) => {
                    // …
                });

        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <MenuButton />
                        <Text style={{ width: '80%', textAlign: 'center', fontSize: 22, fontFamily: AppFontBold }} category='s2'>
                            NEW BOOKING
                        </Text>
                    </View>
                    <TimeCheckbox
                        checked={inmediatePickup == undefined ? undefined : inmediatePickup}
                        style={{ marginBottom: '5%' }}
                        title="IMMEDIATE PICKUP"
                        subTitle="Collect A Car Near Me Immediately"
                        onChange={(v) => setInmediatePickup(p => {
                            if (p === null) return true
                            return !p
                        })}
                    />
                    <TimeCheckbox
                        checked={inmediatePickup == undefined ? undefined : !inmediatePickup}
                        title="SCHEDULE A PICKUP IN ADVANCE"
                        onChange={(v) => {
                            setInmediatePickup(p => {
                                if (p === null) return false
                                return !p
                            })
                        }}
                    />
                    <LocationSearchInput
                        hideReturnToggle={inmediatePickup == false}
                        pickupLocation={originLocation}
                        returnLocation={returnLocation}
                        isInmediatePickup={inmediatePickup == null ? true : !inmediatePickup}
                        onOriginLocationSelected={(l) => {
                            setOriginLocation(l)
                        }}
                        onReturnLocationSelected={(l) => setReturnLocation(l)}
                    />
                    {inmediatePickup !== null && (
                        <>
                            <DatePicker
                                minuteInterval={30}
                                date={departureTime}
                                onDateChange={(d) => {
                                    if (inmediatePickup) {
                                        const nowPlus24Hours = moment().utc().add('h', 24).set({ minutes: 0, seconds: 0 })
                                        if (moment(d).isAfter(nowPlus24Hours)) {
                                            setDepartureTime(nowPlus24Hours.toDate())
                                        } else {
                                            setDepartureTime(d)
                                        }
                                    } else {
                                        setDepartureTime(d)
                                    }
                                    setReturnTime(moment(d).add('days', 1).toDate())
                                }}
                            />
                            <Text style={{ fontFamily: AppFontBold }}>Return Time</Text>
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

                            if (!returnLocation) {
                                setReturnLocation(originLocation)
                            }

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
                                    if (res.data.VehAvailRSCore.VehVendorAvails.length == 0) {
                                        navigation.navigate("NoResult");
                                    } else {
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
                                    }
                                })
                                .catch(() => {
                                    navigation.navigate("NoResult");
                                })
                        }} size="giant" style={{
                            borderRadius: 10,
                            backgroundColor: (originLocation != null && inmediatePickup != null) && loading == false ? '#41d5fb' : '#e4e9f2',
                            borderColor: (originLocation != null && inmediatePickup != null) && loading == false ? '#41d5fb' : '#e4e9f2',
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginBottom: '2%'
                        }}>
                        {() => <Text style={{ color: loading ? "#ACB1C0" : 'white', fontFamily: AppFontBold, fontSize: 18 }}>Search</Text>}
                    </Button>
                </Layout>
            </ScrollView >
        </SafeAreaView>
    )
};
