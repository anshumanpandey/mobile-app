import React, { Component } from "react";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList
} from "react-native";

import { Layout, Avatar, Text, Divider } from "@ui-kitten/components";
import { LoginScreenProps } from "../../types";
import { StackScreenProps } from "@react-navigation/stack";
import { useGlobalState } from "../../state";

const menuData = [
    { name: "Bookings", screenName: "Bookings", key: 1 },
    { name: "Notifications", screenName: "Notifications", key: 2 },
    { name: "Profile", screenName: "Profile", key: 3 },
    { name: "Documents", screenName: "Documents", key: 4 },
];

const DrawerMenu = ({ navigation }: { navigation: any }) => {
    const [profile] = useGlobalState('profile')
    return (
        <View style={styles.container}>
            <Layout style={{ display: 'flex', flexDirection: 'row', paddingBottom: 40 }}>
                <Avatar size='giant' source={{ uri: "http://lorempixel.com/400/400" }} />
                <Layout style={{ marginLeft: 20 }}>
                    <Text category='h3'>{profile?.firstName}</Text>
                    <Text style={{ color: '#52e6fe' }} category='s1'>Edit profile</Text>
                </Layout>

            </Layout>
            <Divider/>

            <FlatList
            style={{ paddingTop: 30 }}
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
        paddingTop: 50,
        paddingLeft: 30
    },
    menuItem: {
        flexDirection: "row"
    },
    menuItemText: {
        fontSize: 20,
        fontWeight: "300",
        margin: 15
    },
});

export default DrawerMenu;