import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import ResolveDoors from '../utils/ResolveDoors';
import ResolveTransmission from '../utils/ResolveTransmission';
import ResolveCurrencySymbol from '../utils/ResolveCurrencySymbol';
import GetCategoryByAcrissCode from '../utils/GetCategoryByAcrissCode';

type Vehicle = {
    doors: string | number;
    seats: string | number;
    luggages?: string | number;
    name: string;
    transmission: string;
    acriss: string;
    price: number;
    secondary_price: number;
    currency?: string,
    custom_location: string
    image_preview_url?: string
    suppliername?: string
    carrentalcompanyname?: string
    supplier_logo?: string
    airConditioner: string
    clickThroughUrl: string
    [k: string]: any | undefined
}

const hightLightStyles = {
    backgroundColor: '#41d5fb',
    priceColor: 'white'
}

type Props = {
    onClick?: () => void,
    isActive?: boolean,
    vehicle: Vehicle
    style?: ViewStyle
}

const CarItem: React.FC<Props> = ({ vehicle, isActive, onClick, style: customeStyles }) => {
    const currentStyles = isActive ? hightLightStyles : { backgroundColor: '#f7f8fa', priceColor: 'black' }

    return (
        <TouchableWithoutFeedback onPress={() => onClick && onClick()}>
            <Layout style={{ padding: '2%', marginBottom: '1%', borderRadius: 16, display: 'flex', flexDirection: 'row', backgroundColor: currentStyles.backgroundColor, ...customeStyles }}>
                <Layout style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '70%', backgroundColor: '#00000000' }}>

                    <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#00000000' }}>
                        <Layout style={{ width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000000' }}>
                            <Image source={{ uri: vehicle.image_preview_url }} style={{ flex: 1, width: 80, height: 80, resizeMode: 'contain' }} />
                        </Layout>


                        <Layout style={{ backgroundColor: '#00000000' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'SF-UI-Display_Bold' }}>{GetCategoryByAcrissCode(vehicle.acriss)}</Text>
                            <Text style={{ fontSize: 10 }}>{vehicle.name}</Text>
                            <Text>Mileage: Unlimited</Text>
                        </Layout>
                    </Layout>


                    <Layout style={{ width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: '#00000000' }}>
                        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                            <Image source={require('../image/door.png')} style={{ width: 20, height: 20 }} />
                            <Text>{ResolveDoors(vehicle.acriss)}</Text>
                        </Layout>
                        {(vehicle.seats !== null && vehicle.seats !== undefined && vehicle.seats !== 0) && (
                            <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image source={require('../image/seats.png')} style={{ width: 20, height: 20 }} />
                                <Text>{vehicle.seats}</Text>
                            </Layout>
                        )}
                        {vehicle.ac && (
                            <Image source={require('../image/AC.png')} style={{ width: 20, height: 20 }} />
                        )}
                        {ResolveTransmission(vehicle.acriss) && (
                            <Image source={require('../image/manual.png')} style={{ width: 20, height: 20 }} />
                        )}
                    </Layout>
                </Layout>

                <Layout style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '30%', backgroundColor: '#00000000' }}>
                    <Image source={{ uri: vehicle.supplier_logo }} style={{ flex: 1, width: 50, height: 50, resizeMode: 'contain' }} />
                    <Image source={require('../image/key.png')} style={{ flex: 1, width: 40, height: 40, resizeMode: 'contain' }} />
                    <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#00000000' }}>
                        <Text style={{ color: currentStyles.priceColor }}>{ResolveCurrencySymbol(vehicle.currency || '')} </Text>
                        <Text style={{ color: currentStyles.priceColor }}>{vehicle.price}</Text>
                    </Layout>
                </Layout>
            </Layout>
        </TouchableWithoutFeedback>
    );
}

export default CarItem
