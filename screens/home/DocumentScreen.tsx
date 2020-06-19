import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import DocumentPicker from 'react-native-document-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { Alert, Platform } from 'react-native';
import useAxios, { makeUseAxios } from 'axios-hooks'
import RNFetchBlob from 'rn-fetch-blob'
import { getGlobalState } from '../../state';

const DocumentScreen = () => {
  const [filesToUpload, setFilesToUpload] = useState(new Map());
  const state = getGlobalState()

  const [getFilesReq, refetch] = useAxios({
    url: `${GRCGDS_BACKEND}`,
    method: 'POST',
    data: { module_name: 'GET_FILES'}
  })


  const [{ data, loading, error }, doPost] = useAxios({
    url: `${GRCGDS_BACKEND}`,
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
      'Accept': 'application/json'
    }
  }, { manual: true })

  const fileTypes = [
    { tag: "Passport", id: "passport", color: 'red' },
    { tag: "Driving License", id: "driving_license", color: 'blue' },
    { tag: "Utility Bill", id: "utility_bill", color: 'green' },
    { tag: "Selfi With Licence", id: "selfi_licence", color: 'gray' },
  ]
  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {fileTypes.map((type) => {
          return (
            <Layout style={{ width: "46%", height: 200, margin: '2%', backgroundColor: type.color, display: "flex", justifyContent: 'center', alignItems: 'center' }}>
              <TouchableWithoutFeedback onPress={async () => {
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.images],
                });
                setFilesToUpload(p => {
                  p.set(type.id, {
                    ...res,
                  });

                  return p;
                });
              }}>
                <Text>{type.tag}</Text>
              </TouchableWithoutFeedback>
            </Layout>
          );

        })}
      </Layout>
      <Button onPress={() => {
        const formData = new FormData();

        formData.append('module_name', "FILE_UPLOAD");

        Array.from(filesToUpload.entries()).forEach(([fileCategory, fileObj], i) => {
          formData.append(fileCategory, { uri: fileObj.uri, name: fileObj.name, type: 'image/jpeg' });
        });

        console.log(formData)

        doPost({ data: formData })
        .then(res => {
          console.log(res.data)
        }).catch(err => console.log(err.response.data))
      }}>Upload</Button>
    </Layout>
  )
};

export default DocumentScreen