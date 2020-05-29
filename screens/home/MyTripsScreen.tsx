import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Layout, Text, Tab, Datepicker, NativeDateService, TabView, Card, Avatar, List, Button } from '@ui-kitten/components';
import { SafeAreaView, View } from 'react-native';
import moment from 'moment';
import TripCard, { TripCardProps } from '../../partials/TripCard';
import MenuButton from '../../partials/MenuButton';
import { useNavigation } from '@react-navigation/native';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import useAxios from 'axios-hooks'

const DATE_FORMAT = 'MMM DD,YYYY'

const formatDateService = new NativeDateService('en', { format: DATE_FORMAT });

const LIST_DATA: TripCardProps[] = [
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: false,
    "tripDate": moment(),
    "pickupLocation": "448 Louise Terrace",
    "dropOffLocation": "593 Jackson Court",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Nissan",
    registratioNumber: "V45646EUU",
    "finalCost": "32.15",
    "arrivalTime": moment()
  },
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: true,
    "tripDate": moment(),
    "pickupLocation": "362 Lancaster Avenue",
    "dropOffLocation": "200 Revere Place",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Toyota",
    registratioNumber: "V45646EUU",
    "finalCost": "80.24",
    "arrivalTime": moment()
  },
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: true,
    "tripDate": moment(),
    "pickupLocation": "277 Brighton Court",
    "dropOffLocation": "907 Eaton Court",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Mazda",
    registratioNumber: "V45646EUU",
    "finalCost": "18.21",
    "arrivalTime": moment()
  },
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: true,
    "tripDate": moment(),
    "pickupLocation": "258 Clinton Street",
    "dropOffLocation": "869 Montague Terrace",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Aston Martin",
    registratioNumber: "V45646EUU",
    "finalCost": "20.65",
    "arrivalTime": moment()
  },
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: true,
    "tripDate": moment(),
    "pickupLocation": "503 Onderdonk Avenue",
    "dropOffLocation": "813 Oriental Court",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Suzuki",
    registratioNumber: "V45646EUU",
    "finalCost": "19.01",
    "arrivalTime": moment(),
    completed: true
  },
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: true,
    "tripDate": moment(),
    "pickupLocation": "902 Suydam Place",
    "dropOffLocation": "224 Engert Avenue",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Porche",
    registratioNumber: "V45646EUU",
    "finalCost": "82.77",
    "arrivalTime": moment(),
    upcoming: true
  },
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: false,
    "tripDate": moment(),
    "pickupLocation": "309 Langham Street",
    "dropOffLocation": "753 Prospect Street",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Cherokee",
    registratioNumber: "V45646EUU",
    "finalCost": "23.22",
    "arrivalTime": moment(),
  },
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: false,
    "tripDate": moment().startOf('month'),
    "pickupLocation": "101 Thames Street",
    "dropOffLocation": "929 Scott Avenue",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Ferrari",
    registratioNumber: "V45646EUU",
    "finalCost": "48.57",
    "arrivalTime": moment()
  },
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: false,
    "tripDate": moment().endOf('month'),
    "pickupLocation": "205 Nixon Court",
    "dropOffLocation": "577 Java Street",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Lange Rover",
    registratioNumber: "V45646EUU",
    "finalCost": "28.50",
    "arrivalTime": moment()
  },
  {
    currencyCode: 'EUR',
    image_preview_url: 'https://carimages.rent.it/EN/1539285845928.png',
    leftImageUri: '../image/rightcars.png',
    keyLess: false,
    "tripDate": moment().startOf('week'),
    "pickupLocation": "208 Thornton Street",
    "dropOffLocation": "649 Elmwood Avenue",
    "pickupTime": moment(),
    "dropoffTime": moment(),
    carName: "Nissan",
    registratioNumber: "V45646EUU",
    "finalCost": "88.04",
    "arrivalTime": moment()
  }
]

const DocumentScreen = () => {
  const navigation = useNavigation();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = React.useState(new Date());

  const [{ data, loading, error }] = useAxios({
    url: `${GRCGDS_BACKEND}/bookings`,
  })

  console.log(data)

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
                <List
                  style={{ backgroundColor: '#f7f9fc', padding: '5%', flexGrow: 1 }}
                  data={LIST_DATA.sort((a, b) => a.tripDate.diff(b.tripDate)).filter(i => moment(date).isSame(i.tripDate, "day")).filter(i => !i.upcoming).filter(i => !i.completed)}
                  renderItem={(data: any) => {
                    return (
                      <TripCard
                        key={data.index}
                        {...data.item}
                      />
                    );
                  }}
                />
              </Layout>
            </Tab>
            <Tab style={{ paddingTop: '6%', paddingBottom: '1%' }} title={evaProps => <Text {...evaProps} style={{ fontFamily: 'SF-UI-Display_Bold', color: selectedIndex == 1 ? '#41d5fb' : '#aeb1c3' }}>UPCOMING</Text>} >
              <Layout style={{ height: '96%' }}>
                <List
                  style={{ backgroundColor: '#f7f9fc', padding: '5%', display: 'flex', flexDirection: 'column' }}
                  data={LIST_DATA.sort((a, b) => a.tripDate.diff(b.tripDate)).filter(i => moment(date).isSame(i.tripDate, "day")).filter(i => i.upcoming == true)}
                  renderItem={(data: any) => {
                    return (
                      <TripCard
                        key={data.index}
                        {...data.item}
                      />
                    );
                  }}
                />
              </Layout>
            </Tab>

            <Tab style={{ paddingTop: '6%', paddingBottom: '1%' }} title={evaProps => <Text {...evaProps} style={{ fontFamily: 'SF-UI-Display_Bold', color: selectedIndex == 2 ? '#41d5fb' : '#aeb1c3' }}>COMPLETED</Text>} >
              <Layout style={{ height: '96%' }}>

                <List
                  style={{ backgroundColor: '#f7f9fc', padding: '5%', display: 'flex', flexDirection: 'column' }}
                  data={LIST_DATA.sort((a, b) => a.tripDate.diff(b.tripDate)).filter(i => moment(date).isSame(i.tripDate, "day")).filter(i => i.completed == true)}
                  renderItem={(data: any) => {
                    return (
                      <TripCard
                        key={data.index}
                        {...data.item}
                      />
                    );
                  }}
                />
              </Layout>
            </Tab>

          </TabView>

        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen