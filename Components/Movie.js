import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle';
import { StackedBarChart } from 'react-native-chart-kit';
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as Animatable from 'react-native-animatable';

export default function Movie(props) {
    navigationOptions = { title: 'Movie', };
    const { navigate } = props.navigation;
    const { params } = props.navigation.state;
    const [movie, setMovie] = useState('');
    const [title, setTitle] = useState(params.item.Title);
    const [year, setYear] = useState(params.item.Year);
    const [rating, setRating] = useState(rating);

    const url = 'http://www.omdbapi.com/?apikey=3066df7&i=' + params.item.imdbID;
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            setMovie(responseJson);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });

    const saveRating = (rating) => {
        console.log(rating);
        setRating(rating);
    }

    return (
        <ScrollView style={[styles.container]}>
            <View style={{ flexDirection: 'row', borderColor: 'grey' }}>

                <Image style={{ width: 150, height: 150, marginLeft: 15, marginTop: 15 }} source={{ uri: params.item.Poster }} />
                <View style={{ marginLeft: 20, marginTop: 40 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12, fontStyle: 'italic' }}>{movie.Type}</Text>
                        <Text style={{ fontSize: 12, fontStyle: 'italic', marginLeft: 15, color: 'darkblue', width: 150 }}>({movie.Language})</Text>
                    </View>
                    <Text style={{ width: 150, fontSize: 16, fontWeight: 'bold' }}>{params.item.Title}</Text>
                    <Text style={{ marginTop: 5, fontSize: 14, fontStyle: 'italic' }}>{params.item.Year}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigate('Favourites', { title, year, rating })}>
                            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ fontSize: 30, marginTop: 5, marginLeft: 10 }}>❤️</Animatable.Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigate('Map', { movie })}
                        >
                            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ fontSize: 30, marginTop: 5, marginLeft: 10 }}>🌍</Animatable.Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', height: 600, borderTopLeftRadius: 20, borderTopEndRadius: 20, marginTop: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.smallcontainer]}>
                        <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require('../Images/clock.png')} />
                        <Text style={{ marginLeft: 10 }}>{movie.Runtime}</Text>
                    </View>
                    <View style={[styles.smallcontainer]}>
                        <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require('../Images/director.png')} />
                        <Text style={{ marginLeft: 10, width: 100 }}>{movie.Director}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.smallcontainer]}>
                        <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require('../Images/country.png')} />
                        <Text style={{ marginLeft: 10, width: 100 }}>{movie.Country}</Text>
                    </View>
                    <View style={[styles.smallcontainer]}>
                        <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require('../Images/star.png')} />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginLeft: 10 }}>{movie.imdbRating} </Text>
                            <Text style={{ fontSize: 12, fontStyle: 'italic', color: 'grey', marginTop: 1 }}>(imdbRating)</Text>
                        </View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <Image style={{ height: 40, width: 40, marginLeft: 10 }} source={require('../Images/award.png')} />
                    <Text style={{ marginLeft: 10, width: 250 }}>{movie.Awards}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <Image style={{ height: 40, width: 40, marginLeft: 10 }} source={require('../Images/actors.png')} />
                    <Text style={{ marginLeft: 10, width: 250 }}>{movie.Actors}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <Image style={{ height: 40, width: 40, marginLeft: 10 }} source={require('../Images/genre.png')} />
                    <Text style={{ marginLeft: 10, width: 250, marginTop: 10 }}>{movie.Genre}</Text>
                </View>
                <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 20, fontSize: 14, fontStyle: 'italic' }}>{movie.Plot}</Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', marginLeft: 5, marginTop: 20 }}>Metacritic</Text>
                        <ProgressCircle
                            percent={(movie.Metascore)}
                            radius={50}
                            borderWidth={4}
                            color="#48a4f0"
                            shadowColor="#E8E7E2"
                            bgColor="#fff"
                            outerCircleStyle={{ marginTop: 20 }}

                        >
                            <Text style={{ color: '#48a4f0', fontSize: 16 }}>{(movie.Metascore)}%</Text>
                        </ProgressCircle>

                    </View>
                    <View style={{ marginLeft: 30, marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontStyle: 'italic', marginLeft: 50, marginBottom: 20 }}>My rating</Text>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Bad", "OK", "Good", "Best!"]}
                            defaultRating={3}
                            size={30}
                            selectedColor={'#48a4f0'}
                            reviewColor={'#48a4f0'}
                            onFinishRating={saveRating}
                            showRating={true}

                        />

                    </View>
                </View>
            </View>


        </ScrollView>
    );
};
Movie.navigationOptions = ({ navigate }) => ({ title: 'Movie' });

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b4e7fa',
        flex: 1
    },
    smallcontainer: {
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset: {
            height: 2,
            width: 2
        },
        flexDirection: 'row',
        backgroundColor: '#b4e7fa',
        width: 150,
        height: 40,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 10
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 15,
        marginTop: 15,
        color: 'grey'
    },
});
