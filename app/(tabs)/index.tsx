import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';

const HomeScreen = () => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [roomsGuests, setRoomsGuests] = useState('');
  const [datesModal, setDatesModal] = useState<Boolean | undefined>(false);
  const [guests, setGuests] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);
  const { width, height } = Dimensions.get('window');

  // Logic to update room count based on guest count
  const updateRooms = (newRooms: number) => {
    console.log('newRooms', newRooms);
    if (newRooms < rooms && guests > newRooms * 2) return;
    setRooms(newRooms);
  };
  const updateGuests = (newGuestCount: number) => {
    const calculatedRooms = Math.ceil(newGuestCount / 2); // 2 guests per room
    setRooms(Math.max(rooms, calculatedRooms));
    setGuests(newGuestCount);
  }
  // Show modal on button click

  const router = useRouter();

  const popularCities = [
    { name: 'Noida', image: 'https://via.placeholder.com/100' },
    { name: 'Gurugram', image: 'https://via.placeholder.com/100' },
    { name: 'Jhansi', image: 'https://via.placeholder.com/100' },
    { name: 'Gaziabad', image: 'https://via.placeholder.com/100' },
    { name: 'Delhi', image: 'https://via.placeholder.com/100' },
    { name: 'Mumbai', image: 'https://via.placeholder.com/100' },
    { name: 'Bangalore', image: 'https://via.placeholder.com/100' },
    { name: 'Chennai', image: 'https://via.placeholder.com/100' },
  ];

  const handleSearch = () => {
    console.log('Search clicked with:', { destination, dates, roomsGuests });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Navbar with Logo */}
        <View style={{ backgroundColor: '#fff', padding: 10, alignItems: 'center', borderBottomWidth: 1, borderColor: '#ddd', elevation: 10 }}>
          <Image
            source={{ uri: 'https://res.cloudinary.com/kumarvivek/image/upload/v1735634569/icy_afyl3a.png' }}
            style={{ width: 60, height: 60 }}
          />
        </View>

        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' }}>Where can we take you?</Text>

        {/* Search Form */}
        <View style={{ padding: 15, backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>

          <TouchableOpacity onPress={() => { router.push('/(tabs)/search/setDestination') }} style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: '#fff' }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, fontWeight: 100, paddingHorizontal: 5 }}>Destination</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, paddingHorizontal: 5 }}>Greater Noida</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <TouchableOpacity onPress={() => { router.push('/(tabs)/search/setDates') }} style={{
              flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, paddingHorizontal: 5, marginBottom: 10, backgroundColor: '#fff', marginRight: 5
            }}>
              <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, fontWeight: '100', paddingHorizontal: 5 }}>
                Dates
              </Text>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, paddingHorizontal: 5 }}>
                1 Jan- 2 Jan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setDatesModal(true); }} style={{
              flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, paddingHorizontal: 5, marginBottom: 10, backgroundColor: '#fff', marginLeft: 5
            }}>
              <Text style={{
                fontFamily: 'Poppins-Regular', fontSize: 12, fontWeight: '100', paddingHorizontal: 5
              }}>
                Rooms & Guest
              </Text>
              <Text style={{
                fontFamily: 'Poppins-Medium', fontSize: 14, paddingHorizontal: 5
              }}>
                {rooms} Room - {guests} Guest
              </Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity onPress={() => { router.push('/(tabs)/booking/hotels'); console.log('go to hotels') }} style={{ backgroundColor: '#ffb000', padding: 15, borderRadius: 5, alignItems: 'center' }} >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Cities */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Popular Cities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
          {popularCities.map((city, index) => (
            <View key={index} style={{ alignItems: 'center', marginHorizontal: 10 }}>
              <Image source={{ uri: city.image }} style={{ width: 80, height: 80, borderRadius: 50, }} />
              <Text style={{ marginTop: 5, fontSize: 14, fontWeight: 'bold' }}>{city.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Additional Section: Offers */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginHorizontal: 15, marginTop: 20 }}>Exclusive Offers</Text>
        <View style={{ paddingHorizontal: 15, marginVertical: 20 }}>
          <View style={{ backgroundColor: '#ffefd5', padding: 15, borderRadius: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>20% Off on First Booking!</Text>
          </View>
          <View style={{ backgroundColor: '#ffefd5', padding: 15, borderRadius: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>Free Breakfast in Selected Hotels</Text>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={datesModal}
        animationType="slide"
        transparent={true}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 10
        }}>
          <View style={{
            width: width,
            height: height * 0.5,
            position: 'absolute',
            bottom: 0,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 16,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 0 }}>
              <Text style={{ fontSize: 18, fontFamily: 'Poppins-SemiBold', marginBottom: 20 }}>Select Room & Guests</Text>
              <TouchableOpacity onPress={() => { setDatesModal(false) }}>
                <Entypo name="cross" size={28} color="black" />
              </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontSize: 14, marginRight: 10, fontFamily: 'Poppins-Regular' }}>Number of Guests:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => updateGuests(guests - 1 < 1 ? 1 : guests - 1)}>
                  <Ionicons name="remove-circle-outline" size={24} color="#ffb000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{guests}</Text>
                <TouchableOpacity onPress={() => updateGuests(guests + 1)}>
                  <Ionicons name="add-circle-outline" size={24} color="#ffb000" />
                </TouchableOpacity>
              </View>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <Text style={{ fontSize: 14, marginRight: 10, fontFamily: 'Poppins-Regular' }}>Number of Rooms:</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => updateRooms(rooms - 1 < 1 ? 1 : rooms - 1)}>
                  <Ionicons name="remove-circle-outline" size={24} color="#ffb000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{rooms}</Text>
                <TouchableOpacity onPress={() => updateRooms(rooms + 1)}>
                  <Ionicons name="add-circle-outline" size={24} color="#ffb000" />
                </TouchableOpacity>
              </View>

            </View>


            {/* <Button title="Close" onPress={closeModal} /> */}
          </View>
        </View>
      </Modal>
    </SafeAreaView >
  );
};

export default HomeScreen;
