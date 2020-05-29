
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCreateBookingState } from './CreateBookingState';
import TimeCheckbox from '../../../partials/TimeCheckbox';
import LocationSearchInput from '../../../partials/SearchLocationInput';
import BuildJson from '../../../utils/BuildJson';
import moment from 'moment';
import { GRCGDS_BACKEND } from 'react-native-dotenv';
import LoadingSpinner from '../../../partials/LoadingSpinner';
import CarItem from '../../../partials/CarItem';


export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [, setBabySeat] = useCreateBookingState("babySeat");
    const [, setChildSeat] = useCreateBookingState("childSeat");
    const [, setSeatBooster] = useCreateBookingState("seatBooster");
    const [, setWifi] = useCreateBookingState("wifi");
    const [, setGps] = useCreateBookingState("gps");

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <CarItem style={{ marginBottom: '5%'}} vehicle={route.params.vehicle} />

                    <Text style={{ marginBottom: '5%'}}>EQUIPEMENT (OPTIONAL EXTRAS)</Text>

                    <TimeCheckbox
                        style={{ marginBottom: '5%' }}
                        title="BABY SEAT"
                        onChange={() => {
                            setBabySeat(p => {
                                return !p
                            })
                        }}
                    />
                    <TimeCheckbox
                        style={{ marginBottom: '5%' }}
                        title="CHILD SEAT"
                        onChange={() => {
                            setChildSeat(p => {
                                return !p
                            })
                        }}
                    />
                    <TimeCheckbox
                        style={{ marginBottom: '5%' }}
                        title="SEAT BOOSTER"
                        onChange={() => {
                            setSeatBooster(p => {
                                return !p
                            })
                        }}
                    />

                    <TimeCheckbox
                        style={{ marginBottom: '5%' }}
                        title="WIFI"
                        onChange={() => {
                            setWifi(p => {
                                return !p
                            })
                        }}
                    />

                    <TimeCheckbox
                        style={{ marginBottom: '5%' }}
                        title="GPS"
                        onChange={() => {
                            setGps(p => {
                                return !p
                            })
                        }}
                    />


                    <Layout style={{ marginTop: '5%' }}>
                        <Button
                            onPress={() => navigation.navigate('Payment', { vehicle: route.params.vehicle })}
                            size="giant" style={{
                                borderRadius: 10,
                                backgroundColor: '#41d5fb',
                                borderColor: '#41d5fb',
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginBottom: '2%'
                            }}>
                            {() => <Text style={{ color: 'white', fontFamily: 'SF-UI-Display_Bold', fontSize: 18 }}>CONTINUE</Text>}
                        </Button>
                    </Layout>
                </Layout>
            </ScrollView >

        </SafeAreaView>
    )
};
