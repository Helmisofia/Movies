import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map(props) {
    const { params } = props.navigation.state;
    const [lat, setLat] = useState(lat);
    const [lng, setLng] = useState(lng);

    console.disableYellowBox = true;

    useEffect(() => {
        getLocation();
    }, [])

    const getLocation = () => {
        const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=fnKX4MMwm8IwDlHmxvqTwwa7EzHVzig3&location=' + params.movie.Country;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setLat(responseJson.results[0].locations[0].latLng.lat);
                setLng(responseJson.results[0].locations[0].latLng.lng);
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
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
                        title={'Country'} />
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

});