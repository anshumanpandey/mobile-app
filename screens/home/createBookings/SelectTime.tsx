
import React, { useState, useRef, useEffect } from 'react'
import { Layout, Text, Input, Button, Select, SelectItem, Popover, Toggle } from '@ui-kitten/components';
import { TouchableWithoutFeedback, ImageProps, ScrollView, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useCreateBookingState } from './CreateBookingState';


export default () => {
    const navigation = useNavigation();
    const [, setOriginLocation] = useCreateBookingState("originLocation");
    const [, setReturnLocation] = useCreateBookingState("returnLocation");

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Layout style={{ flex: 1, padding: '5%' }}>


            </Layout>
        </SafeAreaView>
    )
};
