import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';

export default function Home(props) {
    navigationOptions = { title: 'Home', };
    const { navigate } = props.navigation;
    const [title, setTitle] = useState('');
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const { params } = props.navigation.state;
    const [popular, setPopular] = useState([{ name: 'testi', year: '2009', rating: '8' }, { name: 'testi2', year: '2019', rating: '9' }]);
    const [movieType, setMovieType] = useState('movie')

    const getMovies = () => {
        const url = 'http://www.omdbapi.com/?apikey=3066df7&s=' + title + '&type=movie';
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.Search != null) {
                    setMovies(responseJson.Search);
                }
                else {
                    Alert.alert('Found 0 movies with this title. Try something else.')
                }

            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
        const url2 = 'http://www.omdbapi.com/?apikey=3066df7&s=' + title + '&type=series';
        fetch(url2)
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson.Search != null) {
                    setSeries(responseJson.Search);
                }
                else {
                    Alert.alert('Found 0 series with this title. Try something else.')
                }

            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
    }

    return (
        <ScrollView style={[styles.container]} >
            <Text style={[styles.header]}>Search</Text>
                <View style={[styles.searchbar]}>
                    <TouchableOpacity onPress={getMovies} >
                        <Ionicons name="ios-search" size={20} style={[styles.icon]} />
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.textinput]}
                        clearButtonMode={"always"}
                        placeholder={'Type movie name'}
                        onChangeText={title => setTitle(title)}
                        value={title}>
                    </TextInput>
                </View>

            <Text style={[styles.header]}>Movies</Text>
            <Carousel
                sliderWidth={400}
                itemWidth={150}
                enableSnap={false}
                horizontal={true}
                layout={'stack'}
                layoutCardOffset={`18`}
                keyExtractor={item => item}
                renderItem={({ item }) => <TouchableOpacity style={[styles.border]}
                    onPress={() => navigate('Movie', { item })}
                >
                    <Image style={{ width: '100%', height: '80%', borderRadius: 10 }} source={{ uri: item.Poster }} />
                    <Text style={{ fontSize: 16, marginTop: 5, fontWeight: '600', marginLeft: 5, marginRight: 5 }}>{item.Title}</Text>
                    <Text style={{ fontSize: 14, fontStyle: 'italic' }}>{item.Year}</Text>

                </TouchableOpacity>
                }
                data={movies}
            />
            <Text style={[styles.header]}>Series</Text>
            <Carousel
                sliderWidth={400}
                itemWidth={150}
                enableSnap={false}
                layout={'stack'}
                layoutCardOffset={`18`}
                style={{ marginLeft: "5%" }}
                horizontal={true}
                keyExtractor={item => item}
                renderItem={({ item }) => <TouchableOpacity style={[styles.border]}
                    onPress={() => navigate('Movie', { item })}
                >
                    <Image style={{ width: '100%', height: '80%', borderRadius: 10 }} source={{ uri: item.Poster }} />
                    <Text style={{ fontSize: 16, marginTop: 5, fontWeight: '600', marginLeft: 5, marginRight: 5 }}>{item.Title}</Text>
                    <Text style={{ fontSize: 14, fontStyle: 'italic', marginLeft: 5 }}>{item.Year}</Text>

                </TouchableOpacity>
                }
                data={series}
            />

        </ScrollView>
    );
};
Home.navigationOptions = ({ navigate }) => ({ title: 'Home' });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC'
    },
    header: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 15,
        marginTop: 15,
        color: '#48a4f0',
        marginBottom: 15
    },
    searchbar: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 6,
        width: '95%',
        height: 40,
        marginBottom: 15,
        marginLeft: 10

    },
    textinput: {
        width: '85%',
        marginLeft: 10


    },
    icon: {
        color: 'grey',
        marginLeft: 10,
        marginTop: 10
    },
    border: {
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset: {
            height: 2,
            width: 2
        },
        backgroundColor: 'white',
        height: 300,
        width: 200,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20
    },
});
