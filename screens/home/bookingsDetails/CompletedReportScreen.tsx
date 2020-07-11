import React, { useEffect, useState, useRef } from 'react';
import { Layout, Text, Button, Input } from '@ui-kitten/components';
import LoadingSpinner from '../../../partials/LoadingSpinner';
import { SafeAreaView, ScrollView, Image, TextInput, View, Platform } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { GRCGDS_BACKEND } from 'react-native-dotenv';
import useAxios from 'axios-hooks'
import { useCarDetailState } from './detailsState';
import MenuButton from '../../../partials/MenuButton';
import { AppFontBold, AppFontRegular } from '../../../constants/fonts'

const DocumentScreen = ({ navigation, route }) => {
  const [details] = useCarDetailState("details");

  const [postReq, post] = useAxios({
    url: GRCGDS_BACKEND,
    method: 'POST',
  }, { manual: true })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView keyboardShouldPersistTaps={"handled"} contentContainerStyle={{ flexGrow: 1, display: 'flex', backgroundColor: '#f7f9fc' }}>
        <Layout style={{ flex: 1, padding: '5%', backgroundColor: 'white' }}>
          <MenuButton />

          <Layout style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#00000000', marginTop: '10%', marginBottom: '10%' }}>
            <Text style={{ fontFamily: AppFontBold, marginBottom: '10%', textAlign: 'center' }} category="h3">
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
            disabled={postReq.loading}
            accessoryRight={postReq.loading ? LoadingSpinner : undefined}
            onPress={() => {
              navigation.navigate("Activate", details);
            }}
            size="giant"
            style={{
              backgroundColor: postReq.loading == false ? '#41d5fb' : '#e4e9f2',
              borderColor: postReq.loading == false ? '#41d5fb' : '#e4e9f2',
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
            {() => <Text style={{ color: 'white', fontFamily: AppFontBold, fontSize: 18 }}>Complete</Text>}
          </Button>

        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentScreen