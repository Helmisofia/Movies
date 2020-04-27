import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

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
        <ScrollView style={[styles.container]}>
            <View>
                <Text style={[styles.header]}>Search</Text>
                <View style={[styles.searchbarcontainer]}>

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
                </View>
                <Text style={[styles.header]}>Movies</Text>
                <FlatList
                    style={{ marginLeft: "5%" }}
                    horizontal={true}
                    keyExtractor={item => item}
                    renderItem={({ item }) => <TouchableOpacity style={[styles.border]}
                        onPress={() => navigate('Movie', { item })}
                    >
                        <Text>{item.Title}</Text>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.Poster }} />

                    </TouchableOpacity>
                    }
                    data={movies}
                />
                <Text style={[styles.header]}>Series</Text>
                <FlatList
                    style={{ marginLeft: "5%" }}
                    horizontal={true}
                    keyExtractor={item => item}
                    renderItem={({ item }) => <TouchableOpacity style={[styles.border]}
                        onPress={() => navigate('Movie', { item })}
                    >
                        <Text>{item.Title}</Text>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.Poster }} />

                    </TouchableOpacity>
                    }
                    data={series}
                />
            </View>
            {/*             
            <Text style={[styles.header]}>Search movies by country</Text>
            <TouchableOpacity
                onPress={() => navigate('Map')}
            >
                <Image style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 20 }} source={require('./globe.png')} />
            </TouchableOpacity> */}
            {/* <View>
                <Text style={[styles.header]}>Popular</Text>
                <FlatList
                    style={{ marginLeft: "5%" }}
                    horizontal={true}
                    keyExtractor={item => item}
                    renderItem={({ item }) => <TouchableOpacity style={{}}
                        onPress={() => navigate('Movie', { item })}
                    >
                        <Text>{item.name}</Text>
                        <Text>{item.rating}</Text>
                        <Text>{item.year}</Text>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.Poster }} />

                    </TouchableOpacity>
                    }
                    data={popular}
                />
            </View> */}
        </ScrollView>
    );
};

Home.navigationOptions = ({ navigate }) => ({ title: 'Home' });

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1
    },
    header: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 15,
        marginTop: 15,
        color: '#48a4f0',
        marginBottom: 15
    },
    searchbarcontainer: {
        backgroundColor: '#FCFCFC',
        marginTop: 28,
        alignSelf: 'center',
        marginBottom: 15

    },
    searchbar: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 6,
        width: '95%',
        height: 40,
        marginBottom: 15

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
    border: {
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset: {
            height: 2,
            width: 2
        },
        marginRight: 3,
        marginLeft: 3,
        backgroundColor: 'white',
        height: 150,
        width: 150,
        alignItems: 'center'
    },
});
