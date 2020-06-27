import React, { useRef } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { SafeAreaView, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import * as Progress from 'react-native-progress';
import BackButton from '../partials/BackButton';

const DocumentScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Layout style={{ flex: 1, padding: '5%', backgroundColor: 'white', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Layout>
          <Progress.Circle
            showsText={true}
            textStyle={{ color: "#41d5fb" }}
            color={"#41d5fb"}
            size={280}
            indeterminate={true}
          />
        </Layout>

      </Layout>
    </SafeAreaView>
  );
};

export default DocumentScreen