import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Input, Button, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function Map(props) {

    const [address, setAddress] = useState(params.country);
    const [lat, setLat] = useState(lat);
    const [lng, setLng] = useState(lng);
    const [addressess, setAddressess] = useState('');
    const { navigate } = props.navigation;
    const { params } = props.navigation.state;

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=fnKX4MMwm8IwDlHmxvqTwwa7EzHVzig3&location=' + params.country;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setLat(responseJson.results[0].locations[0].latLng.lat);
                setLng(responseJson.results[0].locations[0].latLng.lng);
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
        setAddress(address);
        setAddressess([...addressess, address]);
        setAddress();
    }

    Map.navigationOptions = ({ navigate }) => ({ title: 'Map' });

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 1 }}
                    region={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 10.1322,
                        longitudeDelta: 10.1221,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: lat,
                            longitude: lng
                        }}
                        title={address} />
                </MapView>
            </View>

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1
    },
    searchbarcontainer: {
        marginTop: 10,
        alignSelf: 'center',
    },
    searchbar: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 6,
        height: 40,
        marginBottom: 15,

    },
    textinput: {
        width: '80%',
        marginLeft: 10

    },
    icon: {
        color: 'grey',
        marginLeft: 10,
        marginTop: 10
    },

});
