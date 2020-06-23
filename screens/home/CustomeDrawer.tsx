import React, { useEffect } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList,
    Alert,
    Image
} from "react-native";

import { Layout, Avatar, Text, Divider, Button, Modal, Card } from "@ui-kitten/components";
import { LoginScreenProps } from "../../types";
import { StackScreenProps } from "@react-navigation/stack";
import { useGlobalState, dispatchGlobalState } from "../../state";
import userHasFullProfile from "../../utils/userHasFullProfile";
import userHasAllFiles from "../../utils/userHasAllFiles";
import { useIsDrawerOpen } from "@react-navigation/drawer";

const menuData = [
];

const DrawerMenu = ({ navigation }: { navigation: any }) => {
    const [profile] = useGlobalState('profile')

    const hasFullProfile = userHasFullProfile(profile || {})
    const hasAllFiles = userHasAllFiles(profile || {})

    const wasDrawerOpen = useIsDrawerOpen();

    useEffect(() => {
        if (hasFullProfile && hasAllFiles) {
            const found = menuData.find(i => i.key == "asd")
            if (!found) menuData.push({ name: "My Trips", screenName: "MyBookings", key: 'asd' },);
        }
    }, [wasDrawerOpen])

    return (
        <>
            <View style={styles.container}>
                <Layout style={{ width: '75%', display: 'flex', flexDirection: 'row', paddingBottom: '20%' }}>
                    <Image
                        style={{ width: 80, height: 80, resizeMode: 'contain' }}
                        source={require('../../image/rightcars.png')}
                    />
                    <Layout style={{ marginLeft: '10%' }}>
                        <Text category='h3'>{profile?.username || profile?.email}</Text>
                        <Text onPress={() => navigation.navigate("EditProfile")} style={{ color: '#52e6fe' }} category='s1'>Edit profile</Text>
                    </Layout>

                </Layout>
                <Divider />

                <FlatList
                    data={menuData}
                    renderItem={({ item }) => (
                        // @ts-ignore
                        <DrawerItem
                            navigation={navigation}
                            screenName={item.screenName as keyof LoginScreenProps}
                            name={item.name}
                            key={item.key}
                        />
                    )}
                />
            </View>
            <Button onPress={() => {
                Alert.alert(
                    "Do you want to logout?",
                    "You will be send the Sign in",
                    [
                        {
                            text: "No",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "Yes", onPress: () => dispatchGlobalState({ type: 'logout' }) }
                    ],
                    { cancelable: false }
                );
            }} size="giant" style={{ borderRadius: 10, backgroundColor: '#cf1830', borderColor: '#cf1830', marginRight: '10%', marginLeft: '10%', marginBottom: '5%' }}>
                {() => <Text style={{ color: 'white' }}>Logout</Text>}
            </Button>
        </>
    );
}

const DrawerItem = ({ navigation, name, screenName }: StackScreenProps<LoginScreenProps> & { name: string, screenName: keyof LoginScreenProps }) => (
    <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
            navigation.navigate(screenName)
        }
    >
        <Text style={styles.menuItemText}>{name}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.43)",
        paddingTop: '20%',
        paddingLeft: '10%'
    },
    menuItem: {
        flexDirection: "row"
    },
    menuItemText: {
        fontSize: 20,
        fontWeight: "300",
        marginBottom: '15%'
    },
});

export default DrawerMenu;