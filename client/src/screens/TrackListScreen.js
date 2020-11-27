import React, { useContext } from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import SignInScreen from './SignInScreen';
import Spacer from '../components/Spacer';


const TrackListScreen = ({ navigation }) => {

    const { state, fetchTracks } = useContext(TrackContext);

    return (
        <>
            <Spacer >
                <NavigationEvents
                    onWillFocus={ fetchTracks }
                />
                <FlatList
                    data={ state }
                    keyExtractor={ item => item._id }
                    renderItem={ ({ item }) => {
                        return (
                            <TouchableOpacity onPress={ () => {
                                navigation.navigate('TrackDetail',
                                    { _id: item._id });
                            } } >
                                <ListItem.Title >
                                    { item.name }
                                </ListItem.Title >
                                <ListItem.Chevron />
                            </TouchableOpacity >
                        );
                    } }
                />
            </Spacer >
        </>
    );
};

TrackListScreen.navigationOptions = {
    title: 'Tracks'
};

const styles = StyleSheet.create({});

export default TrackListScreen;