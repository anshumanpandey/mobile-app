
import React, { useState, useRef, useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import { Button } from '@ui-kitten/components';
import { LoginScreenProps } from '../../types';
import DrawerMenu from './CustomeDrawer';
import BookingScreen from './BookingScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import DocumentScreen from './DocumentScreen';

const Drawer = createDrawerNavigator();
export default ({ navigation }: StackScreenProps<LoginScreenProps>) => {

    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerMenu navigation={props.navigation} />} initialRouteName="Home">
            <Drawer.Screen name="Bookings" component={BookingScreen} />
            <Drawer.Screen name="Notifications" component={NotificationScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Documents" component={DocumentScreen} />
        </Drawer.Navigator>
    )
};
