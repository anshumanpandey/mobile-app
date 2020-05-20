import React, { useState, useEffect } from 'react';
import { Text, Button, CheckBox, Layout } from '@ui-kitten/components';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export type TimeCheckboxProps = {
    title: string
    subTitle: string
    style?: ViewStyle
    defaultChecked?: boolean
    checked?: boolean
    onChange: (v: boolean) => void
}

const TimeCheckbox: React.FC<TimeCheckboxProps> = ({ title, subTitle, style, onChange, defaultChecked, checked: forceChecked }) => {
    const [checked, setChecked] = useState(false);
    const styles = {
        color: '#EEF1F5',
        textColor: '#222B45',
        backgroundColor: '#F7F8FA50'
    }

    if (checked) {
        styles.color = '#41D5FB'
        styles.textColor = '#41D5FB'
        styles.backgroundColor = 'white'
    }

    useEffect(() => {
        if (forceChecked !== undefined) setChecked(forceChecked)
    }, [forceChecked])

    useEffect(() => {
        if (defaultChecked !== undefined) setChecked(defaultChecked)
    }, [])
    return (
        <TouchableWithoutFeedback onPress={() => {
            setChecked(p => {
                onChange(!p)
                return !p
            })
        }} style={{ ...style,backgroundColor: styles.backgroundColor,display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, padding: '3%', borderRadius: 10, borderColor: styles.color}}>
            <Layout style={{ backgroundColor: '#00000000'}}>
                <Text style={{ color: styles.textColor, fontFamily: 'SF-UI-Display_Bold' }}>{title}</Text>
                <Text style={{ color: styles.textColor }}>{subTitle}</Text>
            </Layout>
            <CheckBox checked={checked} />
        </TouchableWithoutFeedback>
    )
};

export default TimeCheckbox