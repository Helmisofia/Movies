import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Input, Button, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = SQLite.openDatabase('movielistdb.db');

export default function Favourites(props) {
    navigationOptions = { title: 'Favourites', };
    const { params } = props.navigation.state;
    const [movielist, setMovielist] = useState([]);

    console.disableYellowBox = true;

    useEffect(() => {
        saveItem();
        console.log(params.rating);
    }, [])

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists movielist (id integer primary key not null, title text, year int);');
        });
        db.transaction(tx => {
            tx.executeSql('insert into movielist (title, year) values (?, ?);', [params.title, params.year]);
        }, null
        )
        db.transaction(tx => {
            tx.executeSql('select * from movielist;', [], (_, { rows }) =>
                setMovielist(rows._array)
            );
        });
        Alert.alert('Added ' + params.title + ' to your favourites.');
    }

    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from movielist where id = ?;`, [id]);
            }, null
        );
        db.transaction(tx => {
            tx.executeSql('select * from movielist;', [], (_, { rows }) =>
                setMovielist(rows._array)
            );
        });
        Alert.alert('Deleted item from your favourites.');
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <View style={[styles.border]}>
                        <TouchableOpacity onPress={() => deleteItem(item.id)}>
                            <Image style={[styles.image]} source={require('../Images/delete.png')} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={[styles.title]}>{item.title} </Text>
                                <Text style={[styles.year]}>{item.year} </Text>
                            </View>
                            {/* <AirbnbRating
                                count={5}
                                reviews={["Terrible", "Bad", "OK", "Good", "Best!"]}
                                defaultRating={params.rating}
                                size={10}
                                selectedColor={'#48a4f0'}
                                reviewColor={'#48a4f0'}
                                showRating={false}
                                isDisabled={true}
                            /> */}
                        </View>
                    </View>}
                data={movielist}

            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1
    },
    border: {
        shadowColor: '#DEDDDD',
        shadowOpacity: 2,
        shadowOffset: {
            height: 2,
            width: 2
        },
        backgroundColor: 'white',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        height: 70,
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 5
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        width: 170
    },
    year: {
        fontSize: 16,
        fontStyle: 'italic'
    }
});