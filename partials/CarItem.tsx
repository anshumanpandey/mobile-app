import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Image, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import ResolveDoors from '../utils/ResolveDoors';
import ResolveTransmission from '../utils/ResolveTransmission';
import ResolveCurrencySymbol from '../utils/ResolveCurrencySymbol';
import GetCategoryByAcrissCode from '../utils/GetCategoryByAcrissCode';
import { VehVendorAvail } from '../types/SearchVehicleResponse';

const hightLightStyles = {
    backgroundColor: '#41d5fb',
    priceColor: 'white'
}

type Props = {
    onClick?: () => void,
    isActive?: boolean,
    vehicle: VehVendorAvail
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
                            <Image source={{ uri: vehicle.Vehicle.VehMakeModel.PictureURL }} style={{ flex: 1, width: 80, height: 80, resizeMode: 'contain' }} />
                        </Layout>


                        <Layout style={{ backgroundColor: '#00000000' }}>
                            <Text style={{ fontSize: 14, fontFamily: 'SF-UI-Display_Bold' }}>{GetCategoryByAcrissCode(vehicle.Vehicle.VehType.VehicleCategory)}</Text>
                            <Text style={{ fontSize: 12 }}>{vehicle.Vehicle.VehMakeModel.Name}</Text>
                            <Text>Mileage: Unlimited</Text>
                        </Layout>
                    </Layout>


                    <Layout style={{ width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: '#00000000' }}>
                        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                            <Image source={require('../image/door.png')} style={{ width: 20, height: 20 }} />
                            <Text>{ResolveDoors(vehicle.Vehicle.VehType.VehicleCategory)}</Text>
                        </Layout>
                        {(vehicle.Vehicle.VehClass.Size !== null && vehicle.Vehicle.VehClass.Size !== undefined && vehicle.Vehicle.VehClass.Size != 0) && (
                            <Layout style={{ display: 'flex', flexDirection: 'row' }}>
                                <Image source={require('../image/seats.png')} style={{ width: 20, height: 20 }} />
                                <Text>{vehicle.Vehicle.VehClass.Size}</Text>
                            </Layout>
                        )}
                        {vehicle.Vehicle.AirConditionInd && (
                            <Image source={require('../image/AC.png')} style={{ width: 20, height: 20 }} />
                        )}
                        {ResolveTransmission(vehicle.Vehicle.VehType.VehicleCategory) && (
                            <Image source={require('../image/manual.png')} style={{ width: 20, height: 20 }} />
                        )}
                    </Layout>
                </Layout>

                <Layout style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '30%', backgroundColor: '#00000000' }}>
                    <Image source={{ uri: vehicle.supplier_logo }} style={{ flex: 1, width: 50, height: 50, resizeMode: 'contain' }} />
                    <Image source={require('../image/key.png')} style={{ flex: 1, width: 40, height: 40, resizeMode: 'contain' }} />
                    <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#00000000' }}>
                        <Text style={{ color: currentStyles.priceColor }}>{ResolveCurrencySymbol(vehicle.TotalCharge.CurrencyCode || '')} </Text>
                        <Text style={{ color: currentStyles.priceColor }}>{vehicle.TotalCharge.RateTotalAmount}</Text>
                    </Layout>
                </Layout>
            </Layout>
        </TouchableWithoutFeedback>
    );
}

export default CarItem
