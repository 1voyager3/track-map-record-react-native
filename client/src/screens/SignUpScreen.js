import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';


const SignUpScreen = () => {

    const { state, signUp, clearErrormessage } = useContext(AuthContext);

    return (
        <View style={ styles.container } >

            <NavigationEvents
                onWillBlur={ clearErrormessage }
                onWillFocus={ clearErrormessage }
            />

            <AuthForm
                headerText="Sign Up for Tracker"
                errorMessage={ state.errorMessage }
                submitButtonText="Sign Up"
                onSubmit={ ({ email, password }) => signUp({ email, password }) }
            />

            <NavLink
                routeName="SignIn"
                text="Already have an account? Sing in instead."
            />

        </View >
    );
};

SignUpScreen.navigationOptions = () => {
    return {
        header: () => false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 250
    }
});

export default SignUpScreen;