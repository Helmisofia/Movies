import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Input, Button, KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Updates } from 'expo';

const db = SQLite.openDatabase('movielistdb.db');

export default function Favourites(props) {
    navigationOptions = { title: 'Favourites', };
    const { navigate } = props.navigation;
    const { params } = props.navigation.state;
    const [movielist, setMovielist] = useState(params.movielist);

    const update = () => {
        db.transaction(tx => {
            tx.executeSql('select * from movielist;', [], (_, { rows }) =>
                setMovielist(rows._array)
            );
            Alert.alert('Favourites are up to date.');
        });
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from movielist;', [], (_, { rows }) =>
                setMovielist(rows._array)
            );
            Alert.alert('Deleted movie from your favourites.');
        });
    }

    const deleteItem = (id) => {
        db.transaction(
            tx => {
                tx.executeSql(`delete from movielist where id = ?;`, [id]);
            }, null, updateList
        )

    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={update}>
            <Image style={{width: 30, height: 30, alignSelf: 'flex-end', marginTop: 10, marginRight: 10}} source={require('./refresh.png')} />
            </TouchableOpacity>
            <FlatList

                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <View style={[styles.border]}>
                        <TouchableOpacity onPress={() => deleteItem(item.id)}>
                        <Image style={{ width: 50, height: 50, marginLeft: 5 }} source={require('./delete.png')} />
                        </TouchableOpacity>
                        <View style={{marginLeft: 15}}>
                        <Text style={{ fontSize: 18, fontWeight: '600', width: 250 }}>{item.title} </Text>
                        <Text style={{ fontSize: 16, fontStyle: 'italic' }}>{item.year} </Text>
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
});
