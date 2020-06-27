import React, { useEffect, useState } from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Layout, Text, Tab, Datepicker, NativeDateService, TabView, Card, Avatar, List, Button } from '@ui-kitten/components';
import { SafeAreaView, View, AsyncStorage } from 'react-native';
import moment from 'moment';
import TripCard, { TripCardProps } from '../../partials/TripCard';
import MenuButton from '../../partials/MenuButton';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import useAxios from 'axios-hooks'
import LoadingSpinner from '../../partials/LoadingSpinner';
import { useGlobalState } from '../../state';
import { BookingResponse } from '../../types/BookingsResponse';
import ResolveCurrencySymbol from '../../utils/ResolveCurrencySymbol';
var parseString = require('react-native-xml2js').parseString;

const DATE_FORMAT = 'MMM DD,YYYY'

const formatDateService = new NativeDateService('en', { format: DATE_FORMAT });


const DocumentScreen = () => {
  const navigation = useNavigation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [parsedResponse, setParsedResponse] = useState([]);
  const [profile] = useGlobalState('profile');
  const [storedBookings] = useGlobalState('storedBookings');

  const [{ loading, error }, refetch] = useAxios<BookingResponse>({
    url: `https://OTA.right-cars.com/`,
    method: 'POST',
    data: `<OTA_VehListRQ xmlns="http://www.opentravel.org/OTA/2003/05" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation = "http://www.opentravel.org/OTA/2003/05 VehResRQ.xsd" >
    <POS>
    <Source>
    <RequestorID Type="5" ID="MOBILE001" />
    </Source>
    </POS>
    <Customer>
    <Primary>
    <Email>${profile.emailaddress}</Email>
    </Primary>
    </Customer>
    </OTA_OTA_VehListRQ>`,
    headers: {
      "Content-Type": "application/soap+xml;charset=utf-8"
    }
  }, { manual: true })

  useFocusEffect(
    React.useCallback(() => {
      refetch()
        .then(r => {
          parseString(r.data, function (err, result: BookingResponse) {
              const dataParsed = result.OTA_VehListRS.VehResRSCore.map(i => {
              const Resnumber = i.VehReservation[0].VehSegmentCore[0].ConfID[0].Resnumber[0]
              const pLocation = i.VehReservation[0].VehSegmentCore[0].LocationDetails[0].Name[0]
              const unixPTime = i.VehReservation[0].VehSegmentCore[0].VehRentalCore[0].PickUpDateTime[0]
              const rLocation = i.VehReservation[0].VehSegmentCore[0].LocationDetails[1].Name[0]
              const unixRTime = i.VehReservation[0].VehSegmentCore[0].VehRentalCore[0].ReturnDateTime[0]

              const storedData = storedBookings.find(i => i.reservationNumber == Resnumber)

              return {
                currencyCode: storedData?.currency_code,
                image_preview_url: storedData?.veh_picture ? storedData?.veh_picture : 'https://carimages.rent.it/EN/1539285845928.png',
                leftImageUri: '../image/rightcars.png',
                keyLess: false,
                "tripDate": moment.utc(moment.unix(unixPTime)),
                "pickupLocation": pLocation,
                "dropOffLocation": rLocation,
                "pickupTime": moment.utc(moment.unix(unixPTime)),
                "dropoffTime": moment.utc(moment.unix(unixRTime)),
                carName: storedData?.veh_name,
                registratioNumber: Resnumber,
                "finalCost": storedData?.total_price || '',
                "arrivalTime": moment.utc(moment.unix(unixRTime))
              }

            })
            setParsedResponse(dataParsed)
          })
        })
    }, [])
  );

  const [locationReq, doSearch] = useAxios({
    url: `${GRCGDS_BACKEND}`,
    params: { module_name: 'LOCATION_SEARCH' }
  })

  useEffect(() => {
    if (locationReq.data) {
      try {
        const jsonStringData = JSON.stringify(locationReq.data);
        AsyncStorage.setItem('locationsData', jsonStringData)
      } catch (error) {
        console.log('We fail to save location data: ' + error.toString())
      }
    }
  }, [locationReq.loading]);

  const activeTrips = parsedResponse ? parsedResponse.filter(booking => {
    return booking.pickupTime.isSame(moment(), 'day')
  }) : null

  const upcommingTrips = parsedResponse ? parsedResponse.filter(booking => {
    return booking.pickupTime.isAfter(moment())
  }) : null

  const completedTrips = parsedResponse ? parsedResponse.filter(booking => {
    return booking.dropoffTime.isBefore(moment())
  }) : null

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, backgroundColor: 'red' }}>

        <Layout>
          <Layout style={{ paddingTop: '3%', paddingLeft: '3%', display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'space-between' }}>
            <MenuButton />
            <Datepicker
              style={{ paddingLeft: '5%', paddingRight: '5%', width: '45%' }}
              controlStyle={{ backgroundColor: 'white', borderRadius: 10, padding: '4%' }}
              placeholder='Pick Date'
              date={date}
              title={(d) => moment(d).format(DATE_FORMAT)}
              dateService={formatDateService}
              onSelect={nextDate => setDate(nextDate)}
              accessoryLeft={() => <EntypoIcon style={{ color: 'black' }} name="calendar" size={22} />}
            />
          </Layout>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: '5%', }}>
            <Text style={{ alignSelf: 'flex-start', marginLeft: '3%', fontFamily: 'SF-UI-Display_Bold', fontSize: 29 }}>My Trips</Text>
            <Button
              onPress={(e) => navigation.navigate("CreateBooking")}
              size="small"
              style={{
                backgroundColor: '#41d5fb',
                borderColor: '#41d5fb',
                borderRadius: 10,
              }}>
              {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: 'white', fontSize: 16 }}>Create Booking</Text>}
            </Button>
          </View>
        </Layout>

        <Layout style={{ flex: 1 }}>
          <TabView
            indicatorStyle={{ backgroundColor: '#41d5fb' }}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <Tab style={{ paddingTop: '6%', paddingBottom: '1%' }} title={evaProps => <Text {...evaProps} style={{ fontFamily: 'SF-UI-Display_Bold', color: selectedIndex == 0 ? '#41d5fb' : '#aeb1c3' }}>ACTIVE</Text>} >
              <Layout style={{ height: '86%' }}>
                {!loading && activeTrips && activeTrips.length !== 0 && <List
                  style={{ backgroundColor: '#f7f9fc', padding: '5%', flexGrow: 1 }}
                  data={activeTrips}
                  renderItem={(data: any) => {
                    return (
                      <TripCard
                        key={data.index}
                        {...data.item}
                      />
                    );
                  }}
                />}
                {!loading && activeTrips && activeTrips.length == 0 && <Text style={{ textAlign: 'center', marginTop: '20%' }} category="h5">No active bookings!</Text>}
                {loading && (
                  <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                    <LoadingSpinner />
                  </Layout>
                )}
              </Layout>
            </Tab>
            <Tab style={{ paddingTop: '6%', paddingBottom: '1%' }} title={evaProps => <Text {...evaProps} style={{ fontFamily: 'SF-UI-Display_Bold', color: selectedIndex == 1 ? '#41d5fb' : '#aeb1c3' }}>UPCOMING</Text>} >
              <Layout style={{ height: '96%' }}>
                {!loading && upcommingTrips && upcommingTrips.length !== 0 && <List
                  style={{ backgroundColor: '#f7f9fc', padding: '5%', flexGrow: 1, marginBottom: 70 }}
                  data={upcommingTrips}
                  renderItem={(data: any) => {
                    return (
                      <TripCard
                        key={data.index}
                        {...data.item}
                      />
                    );
                  }}
                />}

                {!loading && upcommingTrips && upcommingTrips.length == 0 && <Text style={{ textAlign: 'center', marginTop: '20%' }} category="h5">No upcomming bookings!</Text>}
                {loading && (
                  <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                    <LoadingSpinner />
                  </Layout>
                )}
              </Layout>
            </Tab>

            <Tab style={{ paddingTop: '6%', paddingBottom: '1%' }} title={evaProps => <Text {...evaProps} style={{ fontFamily: 'SF-UI-Display_Bold', color: selectedIndex == 2 ? '#41d5fb' : '#aeb1c3' }}>COMPLETED</Text>} >
              <Layout style={{ height: '96%' }}>

                {!loading && completedTrips && completedTrips.length !== 0 && <List
                  style={{ backgroundColor: '#f7f9fc', padding: '5%', display: 'flex', flexDirection: 'column' }}
                  data={completedTrips}
                  renderItem={(data: any) => {
                    return (
                      <TripCard
                        key={data.index}
                        {...data.item}
                      />
                    );
                  }}
                />}

                {!loading && completedTrips && completedTrips.length == 0 && <Text style={{ textAlign: 'center', marginTop: '20%' }} category="h5">No completed bookings!</Text>}
                {loading && (
                  <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
                    <LoadingSpinner />
                  </Layout>
                )}
              </Layout>
            </Tab>

          </TabView>

        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen