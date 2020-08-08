import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const RCDatePicker: React.FC<{ onChange: (dateTime: Date) => void, isVisible: boolean, date: Date }> = ({ onChange, date: dateValue, isVisible = false }) => {
    const [date, setDate] = useState(dateValue)
    const [steps, setSteps] = useState(0);

    useEffect(() => {
        if (isVisible == true) setSteps(1)
    }, [isVisible])

    return (
        <>
        { steps == 1 && (
            <DateTimePicker
                value={date}
                mode={"date"}
                is24Hour={false}
                display="default"
                onChange={(e, d) => {
                    setSteps(0)
                    if (d) {
                        setDate(d)
                        onChange(d)
                    }
                }}
            />
        )}
        </>
    )
};

export default RCDatePicker