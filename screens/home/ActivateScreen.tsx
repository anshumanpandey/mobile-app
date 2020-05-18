import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import moment from 'moment';
import TripCard from '../../partials/TripCard';

const DATE_FORMAT = 'MMM DD,YYYY'

const formatDateService = new NativeDateService('en', { format: DATE_FORMAT });

const DocumentScreen = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView >

        <Layout style={{ flex: 1 }}>

          <Layout style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '5%' }}>
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
            <Text style={{ alignSelf: 'flex-start', marginLeft: '5%' }} category="h3">Active</Text>
          </Layout>


          <Layout style={{ padding: '5%', backgroundColor: '#f7f9fc'}}>
          <TripCard
            tripDate={moment()}
            pickupLocation={"Main Street, Darlington "}
            dropOffLocation={"Main Street, Darlington "}
            pickupTime={"7:15 PM"}
            dropoffTime={"9:15 PM"}

            driver={"Evan Guzman"}
            score={"V46546UUH"}

            finalCost="US$ 35.50"
            arrivalTime="45:05 "

            leftImage={
              <Image
                style={{ width: 60, height: 60 }}
                source={require('../../image/rightcars.png')}
              />
            }

          />

            <Layout style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000000' }}>
              <Image
                style={{ width: 120, height: 120 }}
                source={require('../../image/start.png')}
              />
              <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#00000000' }}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={require('../../image/lock.png')}
                />
                <Image
                  style={{ width: 100, height: 100 }}
                  source={require('../../image/g1.jpg')}
                />
                <Image
                  style={{ width: 100, height: 100 }}
                  source={require('../../image/unlock.png')}
                />
              </Layout>
            </Layout>

            <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#00000000' }}>
              <Text category="h2">ODOMETER 00056887</Text>
              <Text style={{ fontSize: 65 }} category="h1">LOCKED</Text>
            </Layout>

            <Layout style={{ backgroundColor: '#00000000' }}>
              <Button size="giant" style={{ borderRadius: 10, backgroundColor: '#3b5a99', borderColor: '#3b5a99', paddingLeft: 20, paddingRight: 20, marginBottom: '5%' }}>
                END RENTAL
            </Button>
              <Button size="giant" style={{ borderRadius: 10, backgroundColor: '#41d5fb', borderColor: '#41d5fb', paddingLeft: 20, paddingRight: 20 }}>
                HELP
            </Button>
            </Layout>

          </Layout>

        </Layout>
      </ScrollView >

    </SafeAreaView>
  );
};

export default DocumentScreen