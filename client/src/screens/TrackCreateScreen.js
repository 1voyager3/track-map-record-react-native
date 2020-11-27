// import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';
import { FontAwesome } from '@expo/vector-icons';


const TrackCreateScreen = ({ isFocused }) => {

    const { state: { recording }, addLocation } = useContext(LocationContext);

    const callback = useCallback((location) => {
        addLocation(location, recording);
    }, [recording]);

    const [err] = useLocation(isFocused || recording, callback);

    return (
        <SafeAreaView forceInset={ { top: 'always' } } >
            <Text h2 >Create a Track</Text >

            <Map />


            { err
                ? <Text style={ styles.text } >
                    Please enable location services
                </Text >
                : null
            }

            <TrackForm />

        </SafeAreaView >
    );
};

TrackCreateScreen.navigationOptions = {
    title: 'Add Track',
    tabBarIcon: <FontAwesome name="plus" size={ 20 } />
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: 'red'
    }
});

export default withNavigationFocus(TrackCreateScreen);