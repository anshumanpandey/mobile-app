import React, { useEffect, useState } from 'react';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import { SafeAreaView, ScrollView, Image, TextInput, View } from 'react-native';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import TripCard from '../../partials/TripCard';
import { useRoute } from '@react-navigation/native';

const imageArr = []

imageArr[0] = require('../../image/car-1.jpg')
imageArr[1] = require('../../image/car-2.jpg')
imageArr[2] = require('../../image/car-3.jpg')
imageArr[3] = require('../../image/car-4.jpg')
imageArr[4] = require('../../image/car-5.jpg')
imageArr[5] = require('../../image/car-6.jpg')
imageArr[6] = require('../../image/car-7.jpg')
imageArr[7] = require('../../image/car-8.jpg')

const DocumentScreen = () => {
  const route = useRoute();
  const [pictures, setPictures] = useState<ImagePickerResponse[]>([]);
  const [currentPicktureIndex, setCurrentPicktureIndex] = useState(0);

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: '20%', flexGrow: 1,display: 'flex' ,backgroundColor: '#f7f9fc' }}>
        <View style={{ padding: '5%', backgroundColor: '#f7f9fc' }}>
          <TripCard
            {...route.params}
          />

          <Layout style={{ height: '30%',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000000' }}>
            <Text style={{ color: '#d0021b', textAlign: 'center' }} category="h2">
              PLEASE TAKE PICTURES OF ANY DAMAGE TO THE VEHICLE
            </Text>
            <Button onPress={() => {
              ImagePicker.launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {
                  setPictures(p => {
                    p[currentPicktureIndex] = response
                    return p
                  })
                }
              });
            }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '25%', backgroundColor: 'gray', borderColor: 'gray' }}>
              {() => <Text style={{ color: 'white' }}>TAKE PICTURE</Text>}
            </Button>
          </Layout>

          <View style={{ display: 'flex', alignItems: 'center'}}>
            {picture && <Image source={{ uri: picture }} style={{ width: 200, height: 200 }} />}
          </View>

          <Layout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#00000000' }}>
            <Text category="h4"> DESCRIPTION OF DAMAGE</Text>
            <Input
              multiline={true}
              numberOfLines = {10}
            />
          </Layout>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentScreen