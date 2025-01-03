import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

type MarkedDates = {
    [date: string]: {
        startingDay?: boolean;
        endingDay?: boolean;
        color: string;
        textColor: string;
    };
};

type DayPressEvent = {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
};

const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: '2-digit', month: 'short' };
    console.log(new Date(date).toLocaleDateString('en-US', options));
    return new Date(date).toLocaleDateString('en-US', options);
};

const HotelBookingScreen: React.FC = () => {
    const [checkInDate, setCheckInDate] = useState<string | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
    const [markedDates, setMarkedDates] = useState<MarkedDates>({});
    const router = useRouter();

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const todayString = today.toISOString().split('T')[0];
        const tomorrowString = tomorrow.toISOString().split('T')[0];

        setCheckInDate(todayString);
        setCheckOutDate(tomorrowString);
        setMarkedDates({
            [todayString]: {
                startingDay: true,
                color: '#ffb000',
                textColor: 'white',
            },
            [tomorrowString]: {
                endingDay: true,
                color: '#ffb000',
                textColor: 'white',
            },
        });
    }, []);

    const handleDayPress = (day: DayPressEvent) => {
        const selectedDate = day.dateString;

        if (!checkInDate || (checkInDate && checkOutDate)) {
            // Reset dates or set check-in date
            setCheckInDate(selectedDate);
            setCheckOutDate(null);
            setMarkedDates({
                [selectedDate]: {
                    startingDay: true,
                    color: '#ffb000',
                    textColor: 'white',
                },
            });
        } else if (!checkOutDate && selectedDate > checkInDate) {
            // Set check-out date
            setCheckOutDate(selectedDate);
            const range = getMarkedRange(checkInDate, selectedDate);
            setMarkedDates(range);
        } else {
            Alert.alert('Invalid selection', 'Check-out date must be after check-in date.');
        }
    };

    const getMarkedRange = (start: string, end: string): MarkedDates => {
        const range: MarkedDates = {};
        const startDate = new Date(start);
        const endDate = new Date(end);

        let currentDate = startDate;
        while (currentDate <= endDate) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            range[formattedDate] = {
                color: '#ffb000',
                textColor: 'white',
            };
            currentDate.setDate(currentDate.getDate() + 1);
        }

        range[start] = {
            startingDay: true,
            color: '#ffb000',
            textColor: 'white',
        };

        range[end] = {
            endingDay: true,
            color: '#ffb000',
            textColor: 'white',
        };

        return range;
    };

    const handleConfirm = () => {
        if (checkInDate && checkOutDate) {
            Alert.alert('Dates Confirmed', `Check-in: ${checkInDate}, Check-out: ${checkOutDate}`);
            router.back();
        } else {
            Alert.alert('Incomplete Selection', 'Please select both check-in and check-out dates.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: '#f7f7f7' }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                }}
            >
                <TouchableOpacity
                    style={{
                        marginRight: 8,
                    }}
                    onPress={() => {
                        console.log('Back button pressed');
                        router.back();
                    }}
                >
                    <AntDesign name="arrowleft" size={24} color="#333" />
                </TouchableOpacity>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#333',
                    }}
                >
                    Select Dates
                </Text>
            </View>
            <Calendar
                markedDates={markedDates}
                markingType={'period'}
                onDayPress={handleDayPress}
                style={{ padding: 15, paddingHorizontal: 30, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 25, paddingHorizontal: 16, }}>
                <View style={{ alignItems: 'center', padding: 15, paddingHorizontal: 30, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555' }}>Check-in</Text>
                    <Text style={{ fontSize: 14, color: '#333', marginTop: 4 }}>
                        {checkInDate ? formatDate(checkInDate) : 'Not selected'}
                    </Text>
                </View>
                <View style={{ alignItems: 'center', padding: 15, paddingHorizontal: 25, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 2 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#555' }}>Check-out</Text>
                    <Text style={{ fontSize: 14, color: '#333', marginTop: 4 }}>
                        {checkOutDate ? formatDate(checkOutDate) : 'Not selected'}
                    </Text>
                </View>
            </View>
            {/* <Button
                title="Done"
                onPress={handleConfirm}
                disabled={!checkInDate || !checkOutDate}
                
            /> */}
            <TouchableOpacity onPress={() => { router.back() }} style={{ position: 'absolute', bottom: 20, left: 0, right: 0, marginHorizontal: 20, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Poppins-SemiBold', backgroundColor: '#ffb000', color: 'white', paddingVertical: 10, borderRadius: 16, fontSize: 16 }}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
};

export default HotelBookingScreen;
