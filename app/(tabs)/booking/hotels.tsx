import { useRouter } from "expo-router";
import React from "react";
import { View, Text, FlatList, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const hotels = [
    {
        id: "1",
        name: "Hotel Sunshine",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Free Wi-Fi", "Parking", "Breakfast"],
        description: "A cozy place to stay with modern amenities.",
        location: "New Delhi, India",
        distance: "2 km from city center",
        rating: 4.5,
        pricePerNight: "₹2500",
    },
    {
        id: "2",
        name: "Hotel Paradise",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Pool", "Gym", "Spa"],
        description: "Luxury and comfort at affordable prices.",
        location: "Mumbai, India",
        distance: "5 km from airport",
        rating: 4.8,
        pricePerNight: "₹4500",
    },
    {
        id: "3",
        name: "Sea Breeze Resort",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Beach Access", "Bar", "Pet-Friendly"],
        description: "Perfect for a seaside getaway.",
        location: "Goa, India",
        distance: "1 km from beach",
        rating: 4.2,
        pricePerNight: "₹3000",
    },
    {
        id: "4",
        name: "Mountain View Inn",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Mountain Views", "Hiking Trails", "Fireplace"],
        description: "Stay amidst breathtaking mountain views.",
        location: "Manali, India",
        distance: "3 km from Mall Road",
        rating: 4.6,
        pricePerNight: "₹4000",
    },
    {
        id: "5",
        name: "Urban Stay",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Free Wi-Fi", "City Tours", "24/7 Service"],
        description: "Modern amenities in the heart of the city.",
        location: "Bangalore, India",
        distance: "1 km from MG Road",
        rating: 4.3,
        pricePerNight: "₹3500",
    },
    {
        id: "6",
        name: "Royal Heritage Palace",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Heritage Property", "Spa", "Cultural Shows"],
        description: "Experience luxury in a heritage setting.",
        location: "Jaipur, India",
        distance: "4 km from Amber Fort",
        rating: 4.9,
        pricePerNight: "₹6000",
    },
    {
        id: "7",
        name: "Desert Dunes Camp",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Camel Rides", "Bonfire", "Cultural Nights"],
        description: "A unique stay in the heart of the desert.",
        location: "Jaisalmer, India",
        distance: "10 km from Jaisalmer Fort",
        rating: 4.7,
        pricePerNight: "₹5000",
    },
    {
        id: "8",
        name: "Hilltop Paradise",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Infinity Pool", "Yoga Classes", "Organic Meals"],
        description: "Relax and rejuvenate in the hills.",
        location: "Ooty, India",
        distance: "5 km from Rose Garden",
        rating: 4.4,
        pricePerNight: "₹4000",
    },
    {
        id: "9",
        name: "Cityscape Hotel",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Rooftop Dining", "Business Center", "Free Parking"],
        description: "Ideal for business and leisure travelers.",
        location: "Pune, India",
        distance: "3 km from Shivaji Nagar",
        rating: 4.3,
        pricePerNight: "₹3000",
    },
    {
        id: "10",
        name: "Tranquil Grove Retreat",
        images: [
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
            "https://via.placeholder.com/300",
        ],
        amenities: ["Forest Views", "Private Cottages", "Barbecue"],
        description: "Escape to a serene retreat in nature.",
        location: "Wayanad, India",
        distance: "8 km from Edakkal Caves",
        rating: 4.5,
        pricePerNight: "₹3200",
    },
];

const HotelCard = ({ hotel }: { hotel: typeof hotels[0] }) => {
    const router = useRouter();
    return (
        <View
            style={{
                backgroundColor: "#fff",
                marginVertical: 10,
                borderRadius: 10,
                overflow: "hidden",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 5,
            }}
        >
            {/* Carousel */}
            <ScrollView horizontal pagingEnabled style={{ height: 200 }}>
                {hotel.images.map((img, index) => (
                    <Image
                        key={index}
                        source={{ uri: img }}
                        style={{
                            width: width - 20,
                            height: 200,
                            resizeMode: "cover",
                        }}
                    />
                ))}
            </ScrollView>

            {/* Hotel Details */}
            <View style={{ padding: 10 }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 5,
                        color: "#333",
                    }}
                >
                    {hotel.name}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: "#555",
                        marginBottom: 5,
                    }}
                >
                    {hotel.description}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: "#777",
                        marginBottom: 5,
                    }}
                >
                    {hotel.location}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: "#777",
                        marginBottom: 5,
                    }}
                >
                    {hotel.distance}
                </Text>
                <Text
                    style={{
                        fontSize: 14,
                        color: "#ffb000",
                        marginBottom: 5,
                    }}
                >
                    Rating: {hotel.rating} ⭐
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "#ffb000",
                        marginBottom: 10,
                    }}
                >
                    Price per night: {hotel.pricePerNight}
                </Text>

                {/* Amenities */}
                <View style={{ marginBottom: 10 }}>
                    {hotel.amenities.map((amenity, index) => (
                        <Text
                            key={index}
                            style={{
                                fontSize: 12,
                                color: "#555",
                            }}
                        >
                            • {amenity}
                        </Text>
                    ))}
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#ffb000",
                        padding: 10,
                        borderRadius: 5,
                        alignItems: "center",
                    }}
                    onPress={() => { router.push('/(tabs)/booking/hotelDescription') }}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        Book Now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function HotelListScreen() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "#f7f7f7",
                paddingHorizontal: 10,
            }}
        >
            <FlatList
                data={hotels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <HotelCard hotel={item} />}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}
