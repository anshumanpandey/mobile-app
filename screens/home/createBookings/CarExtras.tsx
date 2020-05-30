
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useCreateBookingState } from './CreateBookingState';
import TimeCheckbox from '../../../partials/TimeCheckbox';
import CarItem from '../../../partials/CarItem';
import { VehVendorAvail } from '../../../types/SearchVehicleResponse';

type ParamList = {
    CarExtras: {
        vehicle: VehVendorAvail;
    };
};
export default () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'CarExtras'>>();

    const [, setExtras] = useCreateBookingState("extras");

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: '5%', justifyContent: 'space-between', display: 'flex' }} keyboardShouldPersistTaps={"handled"} style={{ backgroundColor: 'white' }}>

                <Layout>
                    <CarItem style={{ marginBottom: '5%' }} vehicle={route.params.vehicle} />

                    <Text style={{ marginBottom: '5%' }}>EQUIPEMENT (OPTIONAL EXTRAS)</Text>

                    {route.params.vehicle.PricedEquips.map(equip => {
                        return (
                            <TimeCheckbox
                                style={{ marginBottom: '5%' }}
                                title={equip.Equipment.Description}
                                onChange={() => {
                                    setExtras(p => {
                                        const found = p.find(i => i.Equipment.vendorEquipID == equip.Equipment.vendorEquipID)
                                        if (found) return [...p.filter(i => i.Equipment.vendorEquipID !== equip.Equipment.vendorEquipID)]
                                        return [...p, equip]
                                    })
                                }}
                            />
                        );
                    })}



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
