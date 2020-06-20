import React, { useState, useRef, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import { dispatchGlobalState } from '../state';

const WebViewScreen = () => {
    const route = useRoute()
    const navigation = useNavigation();

    return <WebView
        source={{ uri: route.params.url }}
        originWhitelist={['*']}
        onError={(e)=>console.log("WebView error: "+e)}
        javaScriptEnabled={true}
        onMessage={event => {
            const json = JSON.parse(event.nativeEvent.data);
            dispatchGlobalState({ type: 'token', state: json.token })
            dispatchGlobalState({ type: 'profile', state: json })
            navigation.navigate('Home')
        }}
        onNavigationStateChange={(e) => {
            const { url } = e;
            if (!url) return;

            if (url.includes('https://right-cars-club.com/')) {
                const params = url.split("/?")[1];
                if (!params) return;
                const paramsArr = params.split("&");
                if (paramsArr.length == 0) return

                const paramsDic: { [key: string]: string } = {}
                paramsArr.forEach(stringPair => {
                    const [name, val] = stringPair.split('=');
                    paramsDic[name] = val;
                })
                if (!paramsDic.oauth_token) return
            }
        }}
    />;
}
export default WebViewScreen
