
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { TouchableWithoutFeedback, ImageProps, ScrollView, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import LocationSearchInput from '../../../partials/SearchLocationInput';
import { useCreateBookingState } from './CreateBookingState';


export default () => {
    const navigation = useNavigation();
    const [, setOriginLocation] = useCreateBookingState("originLocation");
    const [, setReturnLocation] = useCreateBookingState("returnLocation");

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Layout style={{ flex: 1, padding: '5%' }}>

                <LocationSearchInput
                    onOriginLocationSelected={(l) => setOriginLocation(l)}
                    onReturnLocationSelected={(l) => setReturnLocation(l)}
                />

                <Layout style={{ backgroundColor: '#00000000' }}>
                    <Button onPress={() => navigation.navigate('SelectTime')} size="giant" style={{ borderRadius: 10, backgroundColor: '#5ac8fa', borderColor: '#5ac8fa', paddingLeft: 20, paddingRight: 20, marginBottom: '2%' }}>
                        {() => <Text style={{ color: 'white' }}>SELECT TIME</Text>}
                    </Button>
                </Layout>

            </Layout>
        </SafeAreaView>
    )
};
