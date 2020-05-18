import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Layout, Text, Button, Tab, Datepicker, NativeDateService, TabView, Card, Avatar, List } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import moment from 'moment';
import TripCard, { TripCardProps } from '../../partials/TripCard';

const DATE_FORMAT = 'MMM DD,YYYY'

const formatDateService = new NativeDateService('en', { format: DATE_FORMAT });

const LIST_DATA: TripCardProps[] = [
  {
    "tripDate": moment(),
    "pickupLocation": "448 Louise Terrace",
    "dropOffLocation": "593 Jackson Court",
    "pickupTime": "1:20 PM",
    "dropoffTime": "3:20 PM",
    "driver": "Addie Monroe",
    "score": "8.01",
    "finalCost": "$32.15",
    "arrivalTime": "3:53 AM"
  },
  {
    "tripDate": moment(),
    "pickupLocation": "362 Lancaster Avenue",
    "dropOffLocation": "200 Revere Place",
    "pickupTime": "10:09 AM",
    "dropoffTime": "11:17 PM",
    "driver": "Ollie Mcguire",
    "score": "4.99",
    "finalCost": "$80.24",
    "arrivalTime": "12:55 AM"
  },
  {
    "tripDate": moment(),
    "pickupLocation": "277 Brighton Court",
    "dropOffLocation": "907 Eaton Court",
    "pickupTime": "11:46 AM",
    "dropoffTime": "2:43 PM",
    "driver": "Silvia Delacruz",
    "score": "1.08",
    "finalCost": "$18.21",
    "arrivalTime": "1:14 AM"
  },
  {
    "tripDate": moment(),
    "pickupLocation": "258 Clinton Street",
    "dropOffLocation": "869 Montague Terrace",
    "pickupTime": "6:04 AM",
    "dropoffTime": "9:47 AM",
    "driver": "Brigitte Kane",
    "score": "8.78",
    "finalCost": "$20.65",
    "arrivalTime": "6:52 AM"
  },
  {
    "tripDate": moment(),
    "pickupLocation": "503 Onderdonk Avenue",
    "dropOffLocation": "813 Oriental Court",
    "pickupTime": "7:37 AM",
    "dropoffTime": "9:33 AM",
    "driver": "Louisa Patterson",
    "score": "4.46",
    "finalCost": "$19.01",
    "arrivalTime": "1:52 AM",
    canceled: true
  },
  {
    "tripDate": moment(),
    "pickupLocation": "902 Suydam Place",
    "dropOffLocation": "224 Engert Avenue",
    "pickupTime": "6:22 PM",
    "dropoffTime": "8:27 PM",
    "driver": "Morin Klein",
    "score": "9.85",
    "finalCost": "$82.77",
    "arrivalTime": "9:53 AM",
    completed: true
  },
  {
    "tripDate": moment(),
    "pickupLocation": "309 Langham Street",
    "dropOffLocation": "753 Prospect Street",
    "pickupTime": "9:50 AM",
    "dropoffTime": "12:39 PM",
    "driver": "Penelope Ortega",
    "score": "8.41",
    "finalCost": "$23.22",
    "arrivalTime": "10:39 PM"
  },
  {
    "tripDate": moment().startOf('month'),
    "pickupLocation": "101 Thames Street",
    "dropOffLocation": "929 Scott Avenue",
    "pickupTime": "5:26 PM",
    "dropoffTime": "6:45 AM",
    "driver": "Watson Franco",
    "score": "8.08",
    "finalCost": "$48.57",
    "arrivalTime": "5:42 PM"
  },
  {
    "tripDate": moment().endOf('month'),
    "pickupLocation": "205 Nixon Court",
    "dropOffLocation": "577 Java Street",
    "pickupTime": "4:06 AM",
    "dropoffTime": "6:15 PM",
    "driver": "Nunez Shaw",
    "score": "7.75",
    "finalCost": "$28.50",
    "arrivalTime": "5:29 AM"
  },
  {
    "tripDate": moment().startOf('week'),
    "pickupLocation": "208 Thornton Street",
    "dropOffLocation": "649 Elmwood Avenue",
    "pickupTime": "4:52 AM",
    "dropoffTime": "8:29 AM",
    "driver": "Vivian Sanchez",
    "score": "4.09",
    "finalCost": "$88.04",
    "arrivalTime": "9:14 AM"
  }
]

const DocumentScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = React.useState(new Date());

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, backgroundColor: 'red' }}>

        <Layout style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5%', }}>
          <Datepicker
            style={{ paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', width: '45%' }}
            controlStyle={{ backgroundColor: 'white', borderRadius: 16, padding: '4%' }}
            placeholder='Pick Date'
            date={date}
            title={(d) => moment(d).format(DATE_FORMAT)}
            dateService={formatDateService}
            onSelect={nextDate => setDate(nextDate)}
            accessoryLeft={() => <EntypoIcon style={{ color: 'black' }} name="calendar" size={22} />}
          />
          <Text style={{ alignSelf: 'flex-start', marginLeft: '5%' }} category="h3">My Trips</Text>
        </Layout>

        <Layout style={{ flex: 1 }}>
          <TabView
            indicatorStyle={{ backgroundColor: '#41d5fb' }}
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <Tab title={evaProps => <Text {...evaProps} style={{ color: selectedIndex == 0 ? '#41d5fb' : '#aeb1c3' }}>Upcoming</Text>} >
              <Layout style={{ height: '96%' }}>
                <List
                  style={{ backgroundColor: '#f7f9fc', padding: '5%' }}
                  data={LIST_DATA.sort((a, b) => a.tripDate.diff(b.tripDate)).filter(i => moment.utc(date).isSame(i.tripDate, "day"))}
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
            <Tab title={evaProps => <Text {...evaProps} style={{ color: selectedIndex == 1 ? '#41d5fb' : '#aeb1c3' }}>Complete</Text>} >
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

            <Tab title={evaProps => <Text {...evaProps} style={{ color: selectedIndex == 2 ? '#41d5fb' : '#aeb1c3' }}>Canceled</Text>} >
              <Layout style={{ height: '96%' }}>

                <List
                  style={{ backgroundColor: '#f7f9fc', padding: '5%', display: 'flex', flexDirection: 'column' }}
                  data={LIST_DATA.sort((a, b) => a.tripDate.diff(b.tripDate)).filter(i => moment(date).isSame(i.tripDate, "day")).filter(i => i.canceled == true)}
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