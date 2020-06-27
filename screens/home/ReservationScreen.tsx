import React from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import LoadingSpinner from '../../partials/LoadingSpinner';
import { useRoute, useNavigation } from '@react-navigation/native';
import useAxios from 'axios-hooks'
import CarTripInfoCard from '../../partials/CarTripInfoCard';

const DocumentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [cancelReq, cancelBooking] = useAxios({
    url: `https://OTA.right-cars.com/`,
    method: 'POST',
    data: `<OTA_VehCancelRQ xmlns="http://www.opentravel.org/OTA/2003/05"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05
    VehCancelRQ.xsd">
    <POS>
    <Source>
    <RequestorID Type="5" ID="MOBILE001" />
    </Source>
    </POS>
    <VehCancelRQCore>
    <UniqueID Type="14" ID="${route.params.registratioNumber}"/>
    </VehCancelCore>
    <VehCancelRQInfo>
    </VehCancelRQInfo>
    </OTA_VehCancelRQ>`,
    headers: {
      "Content-Type": "application/soap+xml;charset=utf-8"
    },
  }, { manual: true })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red', }}>
      <ScrollView>
        <Layout style={{ padding: '5%', backgroundColor: '#f7f9fc', flex: 1 }}>
          <CarTripInfoCard
            confirmation={false}
            {...route.params}
            reservationNumber={route.params.registratioNumber}
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
            <Button onPress={() => {
              navigation.navigate('KeyedCarReservation', { ...route.params })
              return
              /*
              if (GPSState.isAuthorized()) {
                navigation.navigate('KeyedCarReservation', {...route.params})
              } else {
                navigation.navigate('Location', { parentProps: route.params, passTo: "KeyedCarReservation"})
              }*/
            }} size="giant" style={{ borderRadius: 10, backgroundColor: '#5ac8fa', borderColor: '#5ac8fa', paddingLeft: 20, paddingRight: 20, marginBottom: '2%' }}>
              {() => <Text style={{ color: 'white', fontFamily: 'SF-UI-Display' }}>GET DIRECTIONS </Text>}
            </Button>
            <Button
              disabled={cancelReq.loading}
              accessoryRight={cancelReq.loading ? LoadingSpinner : undefined}
              onPress={() => {
                cancelBooking()
                  .then((r) => {
                    console.log(r.data)
                    if (r.data.includes('Errors')) {
                      Alert.alert('Error', 'Reservation Not Found')
                      return;
                    }

                    if (navigation.canGoBack()) {
                      navigation.goBack()
                    }
                  })
              }}
              size="giant"
              style={{ borderRadius: 10, marginBottom: '2%', backgroundColor: cancelReq.loading ? '#8f1122':'#cf1830', borderColor: '#cf1830', paddingLeft: 20, paddingRight: 20 }}>
              {() => <Text style={{ color: 'white', fontFamily: 'SF-UI-Display' }}>CANCEL</Text>}
            </Button>
            <Button onPress={() => navigation.navigate('NoPicturDamage', { ...route.params })} size="giant" style={{ borderRadius: 10, backgroundColor: '#0c66ff', borderColor: '#0c66ff', paddingLeft: 20, paddingRight: 20 }}>
              {() => <Text style={{ color: 'white', fontFamily: 'SF-UI-Display' }}>REPORT A PROBLEM</Text>}
            </Button>
          </Layout>

        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentScreen