import React from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Text, Button } from '@ui-kitten/components';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

type Props = { style?: ViewStyle,text?: string, isSmall?: boolean,onPress: (event: GestureResponderEvent) => void }
const GoogleButton: React.FC<Props> = ({ style, onPress, isSmall = true }) => {
    return (
        <Button onPress={onPress} size="small" accessoryLeft={() => <EntypoIcon style={{ color: '#ffffff', marginRight: '8%' }} name="google--with-circle" size={22} />} style={{ borderRadius: 7, backgroundColor: '#ea4335', borderColor: '#ea4335', paddingLeft: 15, paddingRight: 15, width: isSmall == true ? '50%': '90%', ...style }}>
            {() => <Text style={{ color: 'white' }}>Google</Text>}
        </Button>
    )
};

export default GoogleButton