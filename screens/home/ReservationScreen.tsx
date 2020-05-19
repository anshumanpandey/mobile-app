import React from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import TripCard, { TripCardProps } from '../../partials/TripCard';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

const DocumentScreen = () => {
  const route = useRoute();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red', }}>

        <Layout style={{ padding: '5%', backgroundColor: '#f7f9fc', flex: 1 }}>
          <TripCard
            leftImageUri='../image/rightcars.png'
            keyLess={false}
            tripDate={moment()}
            pickupLocation="205 Nixon Court"
            dropOffLocation="577 Java Street"
            pickupTime="4:06 AM"
            dropoffTime="6:15 PM"
            carName="Lange Rover"
            registratioNumber="V45646EUU"
            finalCost="$28.50"
            arrivalTime="5:29 AM"
          />

          <Layout style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000000' }}>
            <Text style={{ textAlign: "center" }} category="h5">
              Pickup Instructions
              When you arrive at the airport head for
              the arrivals hall, and go outside,
              Walk across the road and you will see the
              sign for Alamo
              </Text>
          </Layout>

          <Layout style={{ backgroundColor: '#00000000' }}>
            <Button size="giant" style={{ borderRadius: 10, backgroundColor: '#5ac8fa', borderColor: '#5ac8fa', paddingLeft: 20, paddingRight: 20, marginBottom: '2%' }}>
              GET DIRECTIONS 
            </Button>
            <Button size="giant" style={{ borderRadius: 10, backgroundColor: '#0c66ff', borderColor: '#0c66ff', paddingLeft: 20, paddingRight: 20 }}>
              REPORT A PROBLEM 
            </Button>
          </Layout>

        </Layout>

    </SafeAreaView>
  );
};

export default DocumentScreen