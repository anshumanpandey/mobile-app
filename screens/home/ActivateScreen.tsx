import React from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import TripCard, { TripCardProps } from '../../partials/TripCard';
import { useRoute } from '@react-navigation/native';

const DocumentScreen = () => {
  const route = useRoute();
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView >


          <Layout style={{ padding: '5%', backgroundColor: '#f7f9fc'}}>
          <TripCard
            {...route.params as TripCardProps}
          />

            <Layout style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000000' }}>
              <Image
                style={{ width: 110, height: 110 }}
                source={require('../../image/start.png')}
              />
              <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#00000000', width: '100%' }}>
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require('../../image/lock.png')}
                />
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require('../../image/g1.jpg')}
                />
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require('../../image/unlock.png')}
                />
              </Layout>
            </Layout>

            <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#00000000' }}>
              <Text category="h4">ODOMETER 00056887</Text>
              <Text style={{ fontSize: 45 }} category="h1">LOCKED</Text>
            </Layout>

            <Layout style={{ backgroundColor: '#00000000' }}>
              <Button size="giant" style={{ borderRadius: 10, backgroundColor: '#5ac8fa', borderColor: '#5ac8fa', paddingLeft: 20, paddingRight: 20, marginBottom: '2%' }}>
                {() => <Text style={{ color: 'white'}}>END RENTAL</Text>}
            </Button>
              <Button size="giant" style={{ borderRadius: 10, backgroundColor: '#cf1830', borderColor: '#cf1830', paddingLeft: 20, paddingRight: 20 }}>
                {() => <Text style={{ color: 'white'}}>HELP</Text>}
            </Button>
            </Layout>

          </Layout>

      </ScrollView >

    </SafeAreaView>
  );
};

export default DocumentScreen