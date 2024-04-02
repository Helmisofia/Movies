import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import ProgressCircle from 'react-native-progress-circle';
import { AirbnbRating } from 'react-native-ratings';
import * as Animatable from 'react-native-animatable';

export default function Movie(props) {
    navigationOptions = { title: 'Movie', };
    const { navigate } = props.navigation;
    const { params } = props.navigation.state;
    const [movie, setMovie] = useState('');
    const [title, setTitle] = useState(params.item.Title);
    const [year, setYear] = useState(params.item.Year);
    const [rating, setRating] = useState(rating);

    console.disableYellowBox = true;

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
        Alert.alert('Your rating is ' + rating);
    }

    return (
        <ScrollView style={[styles.container]}>
            <View style={[styles.top]}>
                <Image style={[styles.poster]} source={{ uri: params.item.Poster }} />
                <View style={[styles.toptexts]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.type]}>{movie.Type}</Text>
                        <Text style={[styles.language]}>({movie.Language})</Text>
                    </View>
                    <Text style={[styles.title]}>{params.item.Title}</Text>
                    <Text style={[styles.year]}>{params.item.Year}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigate('Favourites', { title, year, rating })}>
                            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={[styles.animation]}>❤️</Animatable.Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigate('Map', { movie })}
                        >
                            <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={[styles.animation]}>🌍</Animatable.Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[styles.middle]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.smallcontainer]}>
                        <Image style={[styles.middleimage]} source={require('../Images/clock.png')} />
                        <Text style={[styles.middletext]}>{movie.Runtime}</Text>
                    </View>
                    <View style={[styles.smallcontainer]}>
                        <Image style={[styles.middleimage]} source={require('../Images/director.png')} />
                        <Text style={[styles.middletext]}>{movie.Director}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.smallcontainer]}>
                        <Image style={[styles.middleimage]} source={require('../Images/country.png')} />
                        <Text style={[styles.middletext]}>{movie.Country}</Text>
                    </View>
                    <View style={[styles.smallcontainer]}>
                        <Image style={[styles.middleimage]} source={require('../Images/star.png')} />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{marginLeft: 10}}>{movie.imdbRating} </Text>
                            <Text style={[styles.imdbrating]}>(imdbRating)</Text>
                        </View>

                    </View>
                </View>
                <View style={[styles.infoview]}>
                    <Image style={[styles.infoimage]} source={require('../Images/award.png')} />
                    <Text style={[styles.infotext]}>{movie.Awards}</Text>
                </View>
                <View style={[styles.infoview]}>
                    <Image style={[styles.infoimage]} source={require('../Images/actors.png')} />
                    <Text style={[styles.infotext]}>{movie.Actors}</Text>
                </View>
                <View style={[styles.infoview]}>
                    <Image style={[styles.infoimage]} source={require('../Images/genre.png')} />
                    <Text style={[styles.infotext]}>{movie.Genre}</Text>
                </View>
                <Text style={[styles.plot]}>{movie.Plot}</Text>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={[styles.metacritic]}>Metacritic</Text>
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
                        <Text style={[styles.myrating]}>My rating</Text>
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
    top: { 
        flexDirection: 'row', 
        borderColor: 'grey' 
    },
    poster: { 
        width: 150, 
        height: 150, 
        marginLeft: 15, 
        marginTop: 15 
    },
    toptexts: {
        marginLeft: 20, 
        marginTop: 40 
    },
    type: {
        fontSize: 12, 
        fontStyle: 'italic' 
    },
    language: { 
        fontSize: 12, 
        fontStyle: 'italic', 
        marginLeft: 15, 
        color: 'darkblue', 
        width: 150 
    },
    title: {
        width: 150, 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    year: { 
        marginTop: 5, 
        fontSize: 14, 
        fontStyle: 'italic' 
    },
    animation: { 
        fontSize: 30, 
        marginTop: 5, 
        marginLeft: 10 
    },
    middle: { 
        backgroundColor: 'white', 
        height: 600, 
        borderTopLeftRadius: 20, 
        borderTopEndRadius: 20, 
        marginTop: 15 
    },
    middleimage: { 
        height: 20, 
        width: 20, 
        marginLeft: 10 
    },
    middletext: { 
        marginLeft: 10, 
        width: 150 
    },
    imdbrating: { 
        fontSize: 12, 
        fontStyle: 'italic', 
        color: 'grey', 
        marginTop: 1 
    },
    infoview: { 
        flexDirection: 'row', 
        marginLeft: 20, 
        marginRight: 20, 
        marginTop: 10 
    },
    infoimage: { 
        height: 40, 
        width: 40, 
        marginLeft: 10 
    },
    infotext: { 
        marginLeft: 10, 
        width: 250, 
        marginTop: 10 
    },
    plot: { 
        marginLeft: 20, 
        marginRight: 20, 
        marginTop: 20, 
        marginBottom: 20, 
        fontSize: 14, 
        fontStyle: 'italic' 
    },
    metacritic: { 
        fontSize: 16, 
        fontStyle: 'italic', 
        marginLeft: 5, 
        marginTop: 20 
    },
    myrating: { 
        fontSize: 16, 
        fontStyle: 'italic', 
        marginLeft: 50, 
        marginBottom: 20 
    }
});