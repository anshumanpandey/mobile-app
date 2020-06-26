import React, { useRef } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { SafeAreaView, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import * as Progress from 'react-native-progress';
import BackButton from '../partials/BackButton';

const DocumentScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Layout style={{ flex: 1, padding: '5%', backgroundColor: 'white' }}>

        <Layout style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#00000000', alignItems: 'center' }}>
          <BackButton />

          <Text style={{ marginLeft: '2%', textAlign: 'left' }} category="h3">Login</Text>
        </Layout>

        <Layout style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#00000000', marginTop: '15%', marginBottom: '10%' }}>
          <Text style={{ fontFamily: 'SF-UI-Display_Bold', textAlign: 'center' }} category="h3">Wait...</Text>
        </Layout>

        <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Progress.Circle
            showsText={true}
            textStyle={{ color: "#41d5fb" }}
            color={"#41d5fb"}
            size={200}
            indeterminate={true}
          />
        </Layout>

      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen