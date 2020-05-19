import React, { useRef } from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService, TabView, Card, Avatar, Input } from '@ui-kitten/components';
import { SafeAreaView, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

const DocumentScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Layout style={{ flex: 1, padding: '5%', backgroundColor: '#f7f9fc' }}>

        <Layout style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#00000000', marginBottom: '25%' }}>
          <Text style={{ textAlign: 'left' }} category="h3">Forgot your password</Text>
          <Text style={{ color: '#c8b5d3'}} category="s1">Please enter your email address below to receive your password reset instructions. </Text>
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
          Sent
                            </Button>
        <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#00000000' }}>
          <Text style={{ color: '#41d5fb' }}>Back to Sign in</Text>
        </Layout>

      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen