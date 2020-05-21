import React, { Component, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';

const WebViewScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const webview = useRef<WebView | null>(null)

    return <WebView
        ref={ref => (webview.current = ref)}
        source={{ uri: route.params.url }}
        onNavigationStateChange={(e) => {
            const { url } = e;
            if (!url) return;

            // handle certain doctypes
            if (url.includes('https://example.com')) {
                navigation.navigate("Confirmation");
            }
            console.log(e)
            //navigation.navigate('Confirmation')
        }}
    />;
}
export default WebViewScreen
