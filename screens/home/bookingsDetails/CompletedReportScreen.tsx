import React, { useEffect, useState, useRef } from 'react';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView, ScrollView, Image, TextInput, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';


const DocumentScreen = ({ navigation, route }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Layout style={{ flex: 1, padding: '5%', backgroundColor: 'white' }}>

        <Layout style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#00000000', marginTop: '15%', marginBottom: '10%' }}>
          <Text style={{ marginBottom: '10%', textAlign: 'center' }} category="h3">
            Sign our agreement
          </Text>

          <View>
            <Image
              style={{ borderWidth: 1, borderColor: '#41d5fb', height: '65%', resizeMode: 'contain' }}
              source={{ uri: route?.params?.signImagePath }}
            />
          </View>


        </Layout>


        <Button
          onPress={() => {
            navigation.navigate("Home");
          }}
          size="giant"
          style={{
            backgroundColor: '#41d5fb',
            borderColor: '#41d5fb',
            borderRadius: 10,
            shadowColor: '#41d5fb',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.51,
            shadowRadius: 13.16,
            elevation: 10,
          }}>
          {() => <Text style={{ color: 'white', fontFamily: 'SF-UI-Display_Bold', fontSize: 18 }}>Complete</Text>}
        </Button>

      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen