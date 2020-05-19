import React, { Component, useState } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList
} from "react-native";

import { Layout, Avatar, Text, Divider, Button, Modal, Card } from "@ui-kitten/components";
import { LoginScreenProps } from "../../types";
import { StackScreenProps } from "@react-navigation/stack";
import { useGlobalState, dispatchGlobalState } from "../../state";

const menuData = [
    { name: "My trips", screenName: "MyBookings", key: 5 },
    { name: "Reservation", screenName: "Reservation", key: 10 },
];

const DrawerMenu = ({ navigation }: { navigation: any }) => {
    const [logout, setLogout] = useState(false)
    const [profile] = useGlobalState('profile')

    const LogouModal = () => {
        return (
            <Modal visible={true}>
                <Card disabled={true}>
                    <Text>Do you want to logout?</Text>
                    <Layout style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button onPress={() => {
                        setLogout(false)
                        dispatchGlobalState({ type: 'logout' })
                    }} status="basic">
                        Yes
                    </Button>
                    <Button onPress={() => setLogout(false)}>
                        No
                    </Button>
                    </Layout>
                </Card>
            </Modal>
        );
    }

    return (
        <>
            <View style={styles.container}>
                <Layout style={{ width: '75%', display: 'flex', flexDirection: 'row', paddingBottom: '20%' }}>
                    <Avatar size='giant' source={{ uri: "http://lorempixel.com/400/400" }} />
                    <Layout style={{ marginLeft: '10%' }}>
                        <Text category='h3'>{profile?.firstName || profile?.email}</Text>
                        <Text style={{ color: '#52e6fe' }} category='s1'>Edit profile</Text>
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
            <Button onPress={() => setLogout(true)} size="giant" style={{ borderRadius: 10, backgroundColor: '#cf1830', borderColor: '#cf1830', marginRight: '10%', marginLeft: '10%', marginBottom: '5%' }}>
                Logout
            </Button>
            {logout && <LogouModal />}
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