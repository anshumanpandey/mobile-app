import React from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar, Input } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import TripCard, { TripCardProps } from '../../partials/TripCard';
import moment from 'moment';

const DocumentScreen = () => {
  const [picture, setPicture] = React.useState<string | null>(null);

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

        <Layout style={{ flex: 1, padding: '5%', backgroundColor: '#f7f9fc' }}>
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
            <Text style={{ color: '#d0021b', textAlign: 'center' }} category="h2">
              PLEASE TAKE PICTURES OF ANY DAMAGE TO THE VEHICLE
            </Text>
            <Button onPress={() => {
              ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {
                  setPicture(response.uri)
                }
              });
            }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '25%', backgroundColor: 'gray' }}>
                {() => <Text style={{ color: 'white'}}>TAKE PICTURE</Text>}
            </Button>
            {picture && <Image source={{ uri: picture }} />}
          </Layout>

          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#00000000' }}>
            <Text category="h4"> DESCRIPTION OF DAMAGE</Text>
            <Input
              multiline={true}
              textStyle={{ minHeight: 64 }}
            />
          </Layout>

        </Layout>


    </SafeAreaView>
  );
};

export default DocumentScreen