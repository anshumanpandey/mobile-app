
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginScreenProps } from '../../types';
import DrawerMenu from './CustomeDrawer';
import BookingScreen from './BookingScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import DocumentScreen from './DocumentScreen';
import MyTripsScreens from './MyTripsScreen';

const Drawer = createDrawerNavigator();
export default ({ navigation }: StackScreenProps<LoginScreenProps>) => {

    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerMenu navigation={props.navigation} />} initialRouteName="Home">
            <Drawer.Screen name="MyTrips" component={MyTripsScreens} />
            <Drawer.Screen name="Bookings" component={BookingScreen} />
            <Drawer.Screen name="Notifications" component={NotificationScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Documents" component={DocumentScreen} />
        </Drawer.Navigator>
    )
};
