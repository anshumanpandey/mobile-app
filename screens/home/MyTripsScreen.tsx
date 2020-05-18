import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Layout, Text, Button, TabBar, Tab, Datepicker, NativeDateService, TabView, Card, Avatar } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import moment from 'moment';
import TripCard from '../../partials/TripCard';

const DATE_FORMAT = 'MMM DD,YYYY'

const formatDateService = new NativeDateService('en', { format: DATE_FORMAT });

const DocumentScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = React.useState(new Date());

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, backgroundColor: 'green' }}>

        <Layout style={{ display: 'flex', alignItems: 'flex-end',paddingBottom: '5%' }}>
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
          <Text style={{ alignSelf: 'flex-start', marginLeft: '5%'}} category="h3">My Trips</Text>
        </Layout>


        <TabView
          indicatorStyle={{ backgroundColor: '#41d5fb' }}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
          <Tab title={evaProps => <Text {...evaProps} style={{ color: selectedIndex == 0 ? '#41d5fb' : '#aeb1c3' }}>Upcoming</Text>} >
            <Layout style={{ backgroundColor: '#f7f9fc', padding: '5%', display: 'flex', flexDirection: 'column', height: '100%'}}>
              <TripCard
                tripDate={"Today, 08:30 AM"}
                pickupLocation={"874 Hildegard Crossing"}
                dropOffLocation={"27 Sawayn Square"}
                pickupTime={"7:15 PM"}
                dropoffTime={"9:15 PM"}

                driver={"Evan Guzman"}
                score={"4.8"}

                finalCost="US$ 35.50"
                arrivalTime="45:05 "

              />

              <TripCard
                tripDate={"Today, 07:25 PM"}
                pickupLocation={"637 Sawayn Springs Apt. 979"}
                dropOffLocation={"501 Ortiz Cove Suite 961"}
                pickupTime={"8:05 AM"}
                dropoffTime={"8:20 AM"}

                driver={"Johnny Erickson"}
                score={"4.5"}

                finalCost="US$ 17.02"
                arrivalTime="13:30"

              />
            
            </Layout>
          </Tab>
          <Tab title={evaProps => <Text {...evaProps} style={{ color: selectedIndex == 1 ? '#41d5fb' : '#aeb1c3' }}>Complete</Text>} />
          <Tab title={evaProps => <Text {...evaProps} style={{ color: selectedIndex == 2 ? '#41d5fb' : '#aeb1c3' }}>Canceled</Text>} />
        </TabView>
      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen