import React, { useRef } from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar, Input } from '@ui-kitten/components';
import { SafeAreaView, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../partials/BackButton';

const DocumentScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Layout style={{ flex: 1, padding: '5%', backgroundColor: 'white' }}>
        <BackButton />
        <Layout style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#00000000', marginBottom: '25%', marginTop: '5%' }}>
          <Text style={{ fontFamily: 'SF-UI-Display_Bold', textAlign: 'left' }} category="h3">Forgot your password</Text>
          <Text style={{ color: '#8F9BB3'}} category="s1">Please enter your email address below to receive your password reset instructions. </Text>
        </Layout>


        <Input
          style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
          size='large'
          label={() => <Text style={{ fontSize: 15, marginBottom: '2%' }} category='s2'>Email</Text>}
          placeholder='Enter your email'
        />

        <Button
          size="large"
          style={{
            backgroundColor: '#41d5fb',
            borderColor: '#41d5fb',
            marginBottom: '15%',
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
          {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold',color: 'white', fontSize: 18 }}>Sent</Text>}
          </Button>
        <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#00000000' }}>
          <Text onPress={() => navigation.navigate("Login")} style={{ color: '#41d5fb' }}>Back to Sign in</Text>
        </Layout>

      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen