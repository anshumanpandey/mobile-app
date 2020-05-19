import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const BackButton: React.FC<{ text?: string }> = ({ text }) => {
    const navigation = useNavigation();

    return (
        <MaterialIcons size={34} name="arrow-back" onPress={() => navigation.goBack()} />
    )
};

export default BackButton