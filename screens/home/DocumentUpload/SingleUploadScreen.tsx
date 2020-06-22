import React, { useState, useEffect } from 'react';
import { Layout, Text, Button, Datepicker, NativeDateService } from '@ui-kitten/components';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';
import { GRCGDS_BACKEND } from 'react-native-dotenv'
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { Image, Alert, View } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import { dispatchFileState, FileTypeEnum, useDocumentState } from './DocumentState';
import { Formik } from 'formik';
import moment from 'moment';
import useAxios from 'axios-hooks'
import { useGlobalState, dispatchGlobalState } from '../../../state';
import { StackScreenProps } from '@react-navigation/stack';
import { LoginScreenProps } from '../../../types';
import UploadIconComponent from '../../../image/UploadIconComponent';
import { components } from '@eva-design/eva/mapping';

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
    const [currentFileType, setCurrentFileType] = useState(FileTypeEnum.passport);
    const [dictionary] = useDocumentState("dictionary")
    const [profile] = useGlobalState('profile')

    const [getFilesReq, sendFile] = useAxios({
        url: `${GRCGDS_BACKEND}`,
        method: 'POST',
    })

    const initialValues = {
        country: '',
        expDate: moment()
    }

    useEffect(() => {
        if (route.params && route.params.fileType) {
            console.log('params',route.params.fileType )
            setCurrentFileType(route.params.fileType)
        } else {
            setCurrentFileType(FileTypeEnum.passport)
        }
    }, [route.params])

    const currenButtonState = () => {
        if (profile?.passimage != "" && profile?.passimage != "" && profile?.selfiurl != "" ) {
            return { btnTxt: 'Done',disabled: false,canGoNext: true, goTo: 'CompletedUpload' }
        }

        if (profile?.passimage != "" && currentFileType == FileTypeEnum.passport){
            return { btnTxt: 'Next',disabled: false,canGoNext: true, goTo: 'SingleUpload', with: { fileType: FileTypeEnum.driving_license } }
        }

        if (profile?.drimage != "" && currentFileType == FileTypeEnum.driving_license){
            return { btnTxt: 'Done',disabled: false,canGoNext: true, goTo: 'CompletedUpload' }
        }

        if (profile?.selfiurl != "" && currentFileType == FileTypeEnum.selfi){
            return { btnTxt: 'Done',disabled: false,canGoNext: true, goTo: 'CompletedUpload' }
        }

        if (dictionary.get(currentFileType)?.file) {
            return { btnTxt: 'Save', disabled: false, canGoNext: false }
        }

        return { btnTxt: 'Save', canGoNext: false, disabled: true }

    }

    return (
        <Layout style={{ display: 'flex', flex: 1, padding: '3%' }}>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={values => {

                    const data = new FormData();

                    const file = dictionary.get(currentFileType)?.file;

                    const currentFile = dictionary.get(currentFileType)?.file
                    if (currentFile) {
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
                        })
                        .catch(r => console.log(r))

                }}
            >
                {({ handleChange, setFieldValue, handleSubmit, values, errors, touched }) => {

                    return (
                        <>
                            <ScrollView keyboardShouldPersistTaps={"handled"} contentContainerStyle={{ flexGrow: 1 }}>
                                <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 24, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>
                                        {currentFileType}
                                    </Text>
                                </Layout>
                                {!dictionary.get(currentFileType)?.file && <View style={{ backgroundColor: 'white', height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <UploadIconComponent />
                                    <Text style={{ color: 'black', textAlign: 'left', fontSize: 16, fontFamily: 'SF-UI-Display' }} category='s2'>
                                        We need you to upload your
                                    </Text>
                                    <Text style={{ color: 'black', textAlign: 'left', fontSize: 26, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>
                                        {currentFileType}
                                    </Text>
                                </View>}

                                {dictionary.get(currentFileType)?.file && <View style={{ backgroundColor: 'white', height: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

                                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '-35%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button
                                        onPress={(e) => {
                                            ImagePicker.showImagePicker(options, (response) => {
                                                //console.log('Response = ', response);

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
                                    style={{ backgroundColor: 'white', height: '55%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                    onPress={async () => {
                                        const res = await DocumentPicker.pick({
                                            type: [DocumentPicker.types.images],
                                        });
                                        dispatchFileState({ type: currentFileType, state: { file: res } })
                                    }}>

                                    <EntypoIcon style={{ marginRight: '5%', color: 'black' }} size={24} name="images" />
                                    <Text style={{ color: 'black', textAlign: 'left', fontSize: 16, fontFamily: 'SF-UI-Display_Bold' }} category='s2'>
                                        Select the document from gallery
                                    </Text>

                                </TouchableWithoutFeedback>


                            </ScrollView>

                            <Layout style={{ paddingTop: '2%' }}>
                                <Button
                                    disabled={currenButtonState().disabled || getFilesReq.loading}
                                    onPress={() => {
                                        const currentState = currenButtonState()
                                        console.log(currentState)
                                        if (currentState.canGoNext) {
                                            navigation.navigate(currentState.goTo, currentState.with)
                                            return
                                        } else {
                                            handleSubmit()
                                        }
                                    }}
                                    size="giant"
                                    style={{
                                        backgroundColor: currenButtonState().disabled || getFilesReq.loading ? '#e4e9f2' : '#41d5fb',
                                        borderColor: currenButtonState().disabled || getFilesReq.loading ? '#e4e9f2' : '#41d5fb',
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
                                    {() => <Text style={{ fontFamily: 'SF-UI-Display_Bold', color: 'white', fontSize: 18 }}>
                                        {currenButtonState().btnTxt}
                                    </Text>}
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