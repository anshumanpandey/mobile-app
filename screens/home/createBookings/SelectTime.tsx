
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { useNavigation } from '@react-navigation/native';
import { useCreateBookingState } from './CreateBookingState';
import TimeCheckbox from '../../../partials/TimeCheckbox';
import LocationSearchInput from '../../../partials/SearchLocationInput';


export default () => {
    const navigation = useNavigation();
    const [, setOriginLocation] = useCreateBookingState("originLocation");
    const [, setReturnLocation] = useCreateBookingState("returnLocation");
    const [inmediatePickup, setInmediatePickup] = useCreateBookingState("inmediatePickup");
    const [, setDepartureTime] = useCreateBookingState("departureTime");
    const [, setReturnTime] = useCreateBookingState("returnTime");

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ minHeight: '80%',padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <LocationSearchInput
                        onOriginLocationSelected={(l) => setOriginLocation(l)}
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
                                date={new Date()}
                                onDateChange={(d) => setDepartureTime(d)}
                            />
                            <Text style={{ fontFamily: 'SF-UI-Display_Bold' }}>Return Time</Text>
                            <DatePicker
                                date={new Date()}
                                onDateChange={(d) => setReturnTime(d)}
                            />
                        </>
                    )}
                </Layout>
                <Layout style={{ marginTop: '5%' }}>
                    <Button onPress={() => navigation.navigate('SelectTime')} size="giant" style={{ borderRadius: 10, backgroundColor: '#5ac8fa', borderColor: '#5ac8fa', paddingLeft: 20, paddingRight: 20, marginBottom: '2%' }}>
                        {() => <Text style={{ color: 'white' }}>Search</Text>}
                    </Button>
                </Layout>
            </ScrollView >

        </SafeAreaView>
    )
};
