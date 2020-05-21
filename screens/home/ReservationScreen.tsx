import React from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import TripCard, { TripCardProps } from '../../partials/TripCard';
import { useRoute, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import CarTripInfoCard from '../../partials/CarTripInfoCard';

const DocumentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red', }}>
      <ScrollView>
        <Layout style={{ padding: '5%', backgroundColor: '#f7f9fc', flex: 1 }}>
          <CarTripInfoCard
            {...route.params}
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
            <Button onPress={() => navigation.navigate('KeyedCarReservation', {...route.params})} size="giant" style={{ borderRadius: 10, backgroundColor: '#5ac8fa', borderColor: '#5ac8fa', paddingLeft: 20, paddingRight: 20, marginBottom: '2%' }}>
              {() => <Text style={{ color: 'white'}}>GET DIRECTIONS </Text>}
            </Button>
            <Button size="giant" style={{ borderRadius: 10, backgroundColor: '#0c66ff', borderColor: '#0c66ff', paddingLeft: 20, paddingRight: 20 }}>
              {() => <Text style={{ color: 'white'}}>REPORT A PROBLEM</Text>}
            </Button>
          </Layout>

        </Layout>
        </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentScreen