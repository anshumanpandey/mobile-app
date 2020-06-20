import React, { useState } from 'react';
import { Layout, Text, Input } from '@ui-kitten/components';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { Image, Alert } from 'react-native';
import useAxios from 'axios-hooks'
import { useFocusEffect, useRoute } from '@react-navigation/native';
import LoadingSpinner from '../../../partials/LoadingSpinner';
import BackButton from '../../../partials/BackButton';
import { dispatchFileState, FileTypeEnum, useDocumentState } from './DocumentState';
import { Formik } from 'formik';
import ErrorLabel from '../../../partials/ErrorLabel';

const DocumentScreen = () => {
  const route = useRoute()
  const [change, triggerChange] = useState(true);
  const [dictionary] = useDocumentState("dictionary")

  return (
    <Layout style={{ display: 'flex', flex: 1, padding: '3%' }}>
      <Layout style={{ paddingBottom: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
        <Layout style={{ paddingRight: '3%' }}>
          <BackButton />
        </Layout>
        <Text style={{ textAlign: 'left', fontSize: 24, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>
          Upload files
        </Text>
      </Layout>
      <Layout style={{ flex: 1, backgroundColor: 'red' }}>
        {dictionary.get(route.params.fileType)?.file && (
          <Formik
            initialValues={{ expDate: "", country: '' }}
            onSubmit={values => {

            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
              <>
                <TouchableWithoutFeedback onPress={async () => {
                  triggerChange(p => !p)
                  const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.images],
                  });
                }}>
                  {change ? <Image
                    style={{ width: '80%', height: "90%", resizeMode: 'contain' }}
                    source={{ uri: dictionary.get(route.params.fileType)?.file.uri.toString(), cache: 'reload' }}
                  /> : <Image
                      style={{ width: '80%', height: "90%", resizeMode: 'contain' }}
                      source={{ uri: dictionary.get(route.params.fileType)?.file.uri.toString(), cache: 'reload' }}
                    />}
                </TouchableWithoutFeedback>
                <Input
                  status={errors.expDate && touched.expDate ? 'danger' : undefined}
                  value={values.expDate}
                  onChangeText={handleChange('expDate')}
                  style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                  size="large"
                  label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Email</Text>}
                  placeholder='Enter your email'
                  caption={errors.expDate && touched.expDate ? () => <ErrorLabel text={errors.expDate} /> : undefined}
                />
                <Input
                  status={errors.country && touched.country ? 'danger' : undefined}
                  value={values.country}
                  onChangeText={handleChange('country')}
                  style={{ backgroundColor: '#ffffff', borderRadius: 10, marginBottom: '3%' }}
                  size="large"
                  label={() => <Text style={{ fontSize: 15, marginBottom: '5%' }} category='s2'>Email</Text>}
                  placeholder='Enter your email'
                  caption={errors.country && touched.country ? () => <ErrorLabel text={errors.country} /> : undefined}

                />
              </>
            }}
        </Formik>
        )}
        {!dictionary.get(route.params.fileType)?.file && (
          <TouchableWithoutFeedback
            style={{ width: 150, height: '65%', margin: '2%', backgroundColor: 'gray', display: "flex", justifyContent: 'center', alignItems: 'center' }}
            onPress={async () => {
              const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
              });
              dispatchFileState({ type: route.params.fileType, state: { file: res } })
            }}>
            <Layout style={{ backgroundColor: 'gray' }}>
              <Text>{route.params.fileType}</Text>
            </Layout>
          </TouchableWithoutFeedback>
        )}
      </Layout>
      <Layout style={{ paddingTop: '2%' }}>
        {/*<Button
          accessoryRight={postReq.loading ? LoadingSpinner : undefined}
          disabled={postReq.loading || filesToUpload.size == 0}
          onPress={(e) => {
            const formData = new FormData();

            formData.append('module_name', "FILE_UPLOAD");

            Array.from(filesToUpload.entries()).forEach(([fileCategory, fileObj], i) => {
              formData.append(fileCategory, { uri: fileObj.uri, name: fileObj.name, type: 'image/jpeg' });
            });

            doPost({ data: formData })
              .then(res => {
                Alert.alert("Images saved");
                refetch();
              }).catch(err => console.log(err.response.data))
          }}
          size="giant"
          style={{
            backgroundColor: postReq.loading == false ? '#41d5fb' : '#e4e9f2',
            borderColor: postReq.loading == false ? '#41d5fb' : '#e4e9f2',
            marginBottom: '5%',
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
          {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: postReq.loading ? "#ACB1C0" : 'white', fontSize: 18 }}>Save</Text>}
        </Button>
        */}</Layout>
    </Layout>
  )
};

export default DocumentScreen