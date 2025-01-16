import React, { useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    Animated,
    Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const HotelDescriptionScreen = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    const hotel = {
        name: "Hotel Sunshine",
        images: [
            "https://via.placeholder.com/400",
            "https://via.placeholder.com/400",
            "https://via.placeholder.com/400",
        ],
        description:
            "Hotel Sunshine is a luxurious stay offering modern amenities, exceptional service, and a perfect location near the city center. Enjoy a cozy ambiance and top-notch facilities during your stay.",
        pricePerNight: "₹2500",
        amenities: ["Free Wi-Fi", "Parking", "Breakfast", "Swimming Pool", "Spa", "Gym"],
        rating: 4.5,
        location: "New Delhi, India",
        distances: [
            { place: "City Center", distance: "2 km" },
            { place: "Airport", distance: "15 km" },
            { place: "Railway Station", distance: "8 km" },
        ],
        reviews: [
            { user: "John Doe", comment: "Great stay! Loved the facilities.", rating: 5 },
            { user: "Jane Smith", comment: "Decent hotel, but service can improve.", rating: 3 },
        ],
    };

    const imageHeight = 300;

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, imageHeight],
        outputRange: [0, -imageHeight / 2],
        extrapolate: "clamp",
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-imageHeight, 0],
        outputRange: [2, 1],
        extrapolate: "clamp",
    });

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Text key={i} style={{ color: i <= rating ? "#ffb000" : "#ccc", fontSize: 14 }}>
                    ★
                </Text>
            );
        }
        return stars;
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {/* Parallax Images */}
                <Animated.View
                    style={{
                        height: imageHeight,
                        transform: [{ translateY: headerTranslate }, { scale: imageScale }],
                        overflow: "hidden",
                    }}
                >
                    <ScrollView horizontal pagingEnabled>
                        {hotel.images.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={{
                                    width,
                                    height: imageHeight,
                                    resizeMode: "cover",
                                }}
                            />
                        ))}
                    </ScrollView>
                </Animated.View>

                {/* Hotel Details */}
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" }}>
                        {hotel.name}
                    </Text>
                    <Text style={{ fontSize: 16, lineHeight: 22, color: "#555", marginBottom: 15 }}>
                        {hotel.description}
                    </Text>
                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffb000", marginBottom: 15 }}>
                        Price per night: {hotel.pricePerNight}
                    </Text>

                    {/* Coupon Code Section */}
                    <View
                        style={{
                            marginBottom: 20,
                            padding: 10,
                            backgroundColor: "#fff6e5",
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#ffb000",
                        }}
                    >
                        <Text style={{ fontSize: 16, marginBottom: 10, color: "#333" }}>
                            Have a coupon code?
                        </Text>
                        <TextInput
                            placeholder="Enter coupon code"
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 5,
                                padding: 8,
                                marginBottom: 10,
                                fontSize: 14,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#ffb000",
                                paddingVertical: 10,
                                alignItems: "center",
                                borderRadius: 5,
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Amenities */}
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333" }}>
                        Amenities:
                    </Text>
                    {hotel.amenities.map((amenity, index) => (
                        <Text key={index} style={{ fontSize: 14, color: "#555", marginBottom: 5 }}>
                            • {amenity}
                        </Text>
                    ))}

                    {/* Distances */}
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333" }}>
                        Distances from Popular Locations:
                    </Text>
                    {hotel.distances.map((item, index) => (
                        <Text key={index} style={{ fontSize: 14, color: "#555", marginBottom: 5 }}>
                            • {item.place}: {item.distance}
                        </Text>
                    ))}

                    {/* Reviews */}
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333" }}>
                        Ratings & Reviews:
                    </Text>
                    {hotel.reviews.map((review, index) => (
                        <View
                            key={index}
                            style={{
                                marginBottom: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: "#eee",
                                paddingBottom: 10,
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>{review.user}</Text>

                            <View style={{ flexDirection: "row", marginBottom: 5 }}>{renderStars(review.rating)}</View>

                            <Text style={{ fontSize: 14, color: "#555" }}>{review.comment}</Text>
                        </View>
                    ))}

                    {/* Add a Review */}
                    {/* <View style={{ marginBottom: 20, padding: 10, backgroundColor: "#fff6e5", borderRadius: 8 }}>
                        <Text style={{ fontSize: 16, marginBottom: 10, color: "#333" }}>Add your rating:</Text>
                        <TextInput
                            placeholder="Your review"
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 5,
                                padding: 8,
                                marginBottom: 10,
                                fontSize: 14,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#ffb000",
                                paddingVertical: 10,
                                alignItems: "center",
                                borderRadius: 5,
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Submit</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </Animated.ScrollView>

            {/* Book Now Button */}
            <TouchableOpacity
                style={{
                    backgroundColor: "#ffb000",
                    padding: 15,
                    alignItems: "center",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                }}
            >
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Book Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HotelDescriptionScreen;
