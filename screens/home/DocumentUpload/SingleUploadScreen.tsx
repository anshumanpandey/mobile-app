import React, { useState } from 'react';
import { Layout, Text, Input, Button, Datepicker, NativeDateService } from '@ui-kitten/components';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
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

    useFocusEffect(
        React.useCallback(() => {
            if (currentFileType == FileTypeEnum.passport && profile?.passimage) navigation.navigate("SingleUpload", { fileType: FileTypeEnum.driving_license });
            if (currentFileType == FileTypeEnum.driving_license && profile?.drimage) navigation.navigate("SingleUpload", { fileType: FileTypeEnum.selfi });
            if (currentFileType == FileTypeEnum.selfi && profile?.selfiurl) navigation.navigate("CompletedUpload");
            return () => {
                triggerChange(p => !p)
            }
        }, [])
    );

    return (
        <Layout style={{ display: 'flex', flex: 1, padding: '3%' }}>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={values => {

                    const data = new FormData();

                    const file = dictionary.get(currentFileType)?.file;

                    const currentFile = dictionary.get(currentFileType)?.file
                    if (currentFile){
                        if ("fileName" in currentFile) {
                            (file as DocumentPickerResponse).name = (currentFile as ImagePickerResponse).fileName || currentFileType;
                        }
                    }


                    data.append("module_name", "FILE_UPLOAD");
                    data.append("file", file);
                    data.append("fileType", currentFileType);
                    data.append("expDate", values.expDate.format('YYYY-MM-DD'));

                    sendFile({ data })
                        .then(r => {
                            console.log(r.data)
                            dispatchGlobalState({ type: 'profile', state: r.data })
                            Alert.alert("Success", "Data saved!")
                        })
                        .catch(r => console.log(r))

                }}
            >
                {({ handleChange, setFieldValue, handleSubmit, values, errors, touched }) => {

                    return (
                        <>
                            <ScrollView keyboardShouldPersistTaps={"handled"} contentContainerStyle={{ flexGrow: 1 }}>
                                {!dictionary.get(currentFileType)?.file && <View style={{ backgroundColor: '#2f378c', height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 16, fontFamily: 'SF-UI-Display' }} category='s2'>
                                        We need you to upload your
                                    </Text>
                                    <Text style={{ color: 'white', textAlign: 'left', fontSize: 26, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>
                                        {currentFileType}
                                    </Text>
                                </View>}

                                {dictionary.get(currentFileType)?.file && <View style={{ backgroundColor: '#2f378c', height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <>
                                        <Image
                                            key={dictionary.get(currentFileType)?.file?.uri}
                                            style={{ width: 150, height: 200, resizeMode: 'cover', marginBottom: '3%' }}
                                            source={{ uri: dictionary.get(currentFileType)?.file?.uri, cache: 'reload' }}
                                        />
                                        {currentFileType != FileTypeEnum.selfi && (
                                            <Datepicker
                                                label="Expire Date"
                                                style={{ paddingLeft: '5%', paddingRight: '5%', width: '100%' }}
                                                controlStyle={{ backgroundColor: 'white', borderRadius: 10, padding: '4%' }}
                                                placeholder='Pick Date'
                                                date={values.expDate?.toDate()}
                                                title={(d) => moment(d)?.format(DATE_FORMAT)}
                                                dateService={formatDateService}
                                                onSelect={nextDate => setFieldValue("expDate", moment(nextDate))}
                                                accessoryLeft={() => <EntypoIcon style={{ color: 'black' }} name="calendar" size={22} />}
                                            />
                                        )}
                                    </>
                                </View>}

                                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '-20%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        onPress={(e) => {
                                            ImagePicker.showImagePicker(options, (response) => {
                                                console.log('Response = ', response);

                                                if (response.didCancel) {
                                                    console.log('User cancelled image picker');
                                                } else if (response.error) {
                                                    console.log('ImagePicker Error: ', response.error);
                                                } else if (response.customButton) {
                                                    console.log('User tapped custom button: ', response.customButton);
                                                } else {
                                                    dispatchFileState({ type: currentFileType, state: { file: response } })
                                                }
                                            });
                                        }}
                                        style={{
                                            zIndex: 2,
                                            backgroundColor: '#41d5fb',
                                            borderColor: '#41d5fb',
                                            borderRadius: 30,
                                            width: '50%',
                                            marginLeft: 'auto',
                                            marginRight: 'auto'
                                        }}>
                                        {() => {
                                            return (
                                                <>
                                                    <EntypoIcon style={{ marginRight: '5%', color: 'white' }} size={24} name="camera" />
                                                    <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: 'white', fontSize: 18 }}>
                                                        Use Camera
                                                    </Text>
                                                </>
                                            );
                                        }}
                                    </Button>
                                </View>

                                <TouchableWithoutFeedback
                                    style={{ backgroundColor: 'white', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                    onPress={async () => {
                                        const res = await DocumentPicker.pick({
                                            type: [DocumentPicker.types.images],
                                        });
                                        dispatchFileState({ type: currentFileType, state: { file: res } })
                                    }}>

                                    <EntypoIcon style={{ marginRight: '5%', color: '#2f378c' }} size={24} name="images" />
                                    <Text style={{ color: '#2f378c', textAlign: 'left', fontSize: 16, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>
                                        Select the document from gallery
                                    </Text>

                                </TouchableWithoutFeedback>


                            </ScrollView>

                            <Layout style={{ paddingTop: '2%' }}>
                                <Button
                                    disabled={!dictionary.get(currentFileType)?.file || getFilesReq.loading}
                                    onPress={handleSubmit}
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
                                    {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: 'white', fontSize: 18 }}>Save</Text>}
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