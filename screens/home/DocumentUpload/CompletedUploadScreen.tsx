import React, { useState } from 'react';
import { Layout, Text, Input, Button, Datepicker, NativeDateService } from '@ui-kitten/components';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import ImagePicker from 'react-native-image-picker';
import { Image, Alert, SafeAreaView, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useFocusEffect, useRoute, RouteProp } from '@react-navigation/native';
import LoadingSpinner from '../../../partials/LoadingSpinner';
import BackButton from '../../../partials/BackButton';
import { dispatchFileState, FileTypeEnum, useDocumentState } from './DocumentState';
import { Formik } from 'formik';
import moment from 'moment';
import useAxios from 'axios-hooks'
import { useGlobalState, dispatchGlobalState } from '../../../state';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginScreenProps } from '../../../types';

const DATE_FORMAT = 'MMM DD,YYYY'
const formatDateService = new NativeDateService('en', { format: DATE_FORMAT });

type ParamList = {
    DocumentMetadata: {
        fileType: FileTypeEnum,
        metadata: boolean,
        year: string,
        month: string,
        day: string,
        image: string
    }
}

const options = {
    title: 'Select picture',
    chooseFromLibraryButtonTitle: '',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


type Props = StackScreenProps<LoginScreenProps, 'SingleUpload'>;

const DocumentScreen = ({ route, navigation }: Props) => {
    const [change, triggerChange] = useState(true);
    const [dictionary] = useDocumentState("dictionary")
    const [profile] = useGlobalState('profile')

    let currentFileType = FileTypeEnum.passport
    if (!profile?.passimage) currentFileType = FileTypeEnum.passport
    if (!profile?.drimage) currentFileType = FileTypeEnum.driving_license
    if (!profile?.selfiurl) currentFileType = FileTypeEnum.selfi
    if (route.params && route.params.fileType) currentFileType = route.params.fileType

    const [getFilesReq, sendFile] = useAxios({
        url: `${GRCGDS_BACKEND}`,
        method: 'POST',
    })

    const initialValues = {
        country: '',
        expDate: moment()
    }


    return (
        <Layout style={{ display: 'flex', flex: 1, padding: '3%' }}>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={values => {

                    const data = new FormData();

                    data.append("module_name", "FILE_UPLOAD");
                    data.append("file", dictionary.get(currentFileType)?.file);
                    data.append("fileType", currentFileType);
                    data.append("expDate", values.expDate.format('YYYY-MM-DD'));

                    sendFile({ data })
                        .then(r => {
                            console.log(r.data)
                            /*dispatchGlobalState({ type: 'profile', state: r.data })
                            Alert.alert("Success", "Data saved!")*/
                        })
                        .catch(r => console.log(r))

                }}
            >
                {({ handleChange, setFieldValue, handleSubmit, values, errors, touched }) => {

                    return (
                        <>
                            <ScrollView keyboardShouldPersistTaps={"handled"} contentContainerStyle={{ flexGrow: 1 }}>
                                <View style={{ backgroundColor: '#2f378c', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 26, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>
                                        You have completed the verification proccess!
                                    </Text>
                                </View>
                            </ScrollView>

                            <Layout style={{ paddingTop: '2%' }}>
                                <Button
                                    disabled={!dictionary.get(currentFileType)?.file || getFilesReq.loading}
                                    onPress={() => {
                                        navigation.navigate('MyBookings');
                                    }}
                                    size="giant"
                                    style={{
                                        backgroundColor: (!dictionary.get(currentFileType)?.file || getFilesReq.loading) ? '#e4e9f2' : '#41d5fb',
                                        borderColor: (!dictionary.get(currentFileType)?.file || getFilesReq.loading) ? '#e4e9f2' : '#41d5fb',
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
                                    {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: 'white', fontSize: 18 }}>Start using the app</Text>}
                                </Button>
                            </Layout>
                        </>
                    )
                }}
            </Formik>
        </Layout>
    )
};

export default DocumentScreen