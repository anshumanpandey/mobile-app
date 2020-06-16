import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';
import DocumentPicker from 'react-native-document-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { Alert, Platform } from 'react-native';
import useAxios from 'axios-hooks'


const DocumentScreen = () => {
  const [filesToUpload, setFilesToUpload] = useState(new Map());

  const [{ data, loading, error }, doPost] = useAxios({
      url: `${GRCGDS_BACKEND}`,
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data; charset=utf-8;"
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
                    uri: Platform.OS === "android" ? res.uri : res.uri.replace("file://", ""),
                    type: res.type,
                    name: res.name,
                    size: res.size
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
        const data = new FormData();
        data.append("module_name", "FILE_UPLOAD");

        Array.from(filesToUpload.entries()).forEach(([fileCategory, fileObj]) => {
          data.append(fileCategory, JSON.stringify(fileObj));
        });

        doPost({ data })
        .then(res => {
          console.log(res.data)
        })
      }}>Upload</Button>
    </Layout>
  )
};

export default DocumentScreen