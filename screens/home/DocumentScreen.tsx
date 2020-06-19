import React, { useState } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import DocumentPicker from 'react-native-document-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import { Image, Alert } from 'react-native';
import useAxios from 'axios-hooks'
import { useFocusEffect } from '@react-navigation/native';
import LoadingSpinner from '../../partials/LoadingSpinner';

const DocumentScreen = () => {
  const [filesToUpload, setFilesToUpload] = useState(new Map());
  const [change, triggerChange] = useState(true);

  const [getFilesReq, refetch] = useAxios({
    url: `${GRCGDS_BACKEND}`,
    method: 'POST',
    data: { module_name: 'GET_FILES' }
  })

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {
        setFilesToUpload(p => {
          p.clear();
          return p;
        });
      }
    }, [])
  );

  const [postReq, doPost] = useAxios({
    url: `${GRCGDS_BACKEND}`,
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
      'Accept': 'application/json'
    }
  }, { manual: true })

  const fileTypes = [
    { tag: "Passport", id: "passport", color: 'gray' },
    { tag: "Driving License", id: "driving_license", color: 'gray' },
    { tag: "Utility Bill", id: "utility_bill", color: 'gray' },
    { tag: "Selfi With Licence", id: "selfi_licence", color: 'gray' },
  ]

  return (
    <Layout style={{ display: 'flex', flex: 1 }}>
      <Layout style={{ flex: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {fileTypes.map((type) => {
          if (filesToUpload.has(type.id)) {
            return (
              <TouchableWithoutFeedback onPress={async () => {
                triggerChange(p => !p)
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.images],
                });
                setFilesToUpload(p => {
                  p.set(type.id, {
                    ...res,
                  });

                  return new Map(p);
                });
              }}>
                {change ? <Image
                  key={filesToUpload.get(type.id).uri.toString()}
                  style={{ width: 180, height: 250, resizeMode: 'cover' }}
                  source={{ uri: filesToUpload.get(type.id).uri.toString(), cache: 'reload' }}
                />: <Image
                key={filesToUpload.get(type.id).uri.toString()}
                style={{ width: 180, height: 250, resizeMode: 'cover' }}
                source={{ uri: filesToUpload.get(type.id).uri.toString(), cache: 'reload' }}
              />}
              </TouchableWithoutFeedback>
            );
          }

          if (getFilesReq.data) {
            const found = getFilesReq.data.find((fileFromServer: { [k: string]: string }) => {
              return fileFromServer[type.id]
            })

            if (found) {
              return (
                <TouchableWithoutFeedback onPress={async () => {
                  const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.images],
                  });
                  triggerChange(p => !p)
                  setFilesToUpload(p => {
                    p.set(type.id, {
                      ...res,
                    });
                    return new Map(p);
                  });
                }}>
                  {change ? <Image
                    key={`https://www.right-cars.com/mobileapp/docs/${found[type.id]}`}
                    style={{ width: 180, height: 250 }}
                    source={{ uri: `https://www.right-cars.com/mobileapp/docs/${found[type.id]}`, cache: 'reload' }}
                  />:
                  <Image
                    key={`https://www.right-cars.com/mobileapp/docs/${found[type.id]}`}
                    style={{ width: 180, height: 250 }}
                    source={{ uri: `https://www.right-cars.com/mobileapp/docs/${found[type.id]}`, cache: 'reload' }}
                  />}
                </TouchableWithoutFeedback>
              );
            }
          }

          return (
            <TouchableWithoutFeedback
              style={{ width: 170, height: 250, margin: '2%', backgroundColor: type.color, display: "flex", justifyContent: 'center', alignItems: 'center' }}
              onPress={async () => {
                const res = await DocumentPicker.pick({
                  type: [DocumentPicker.types.images],
                });
                setFilesToUpload(p => {
                  p.set(type.id, {
                    ...res,
                  });
                  triggerChange(p => !p)

                  return p;
                });
              }}>
              <Layout style={{ backgroundColor: type.color }}>
                <Text>{type.tag}</Text>
              </Layout>
            </TouchableWithoutFeedback>
          );

        })}
      </Layout>
      <Layout style={{ padding: '2%' }}>
        <Button
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
      </Layout>
    </Layout>
  )
};

export default DocumentScreen