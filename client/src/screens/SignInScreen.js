import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';


const SignInScreen = () => {

    const { state, signIn, clearErrormessage } = useContext(AuthContext);


    return (
        <View style={ styles.container } >

            <NavigationEvents
                onWillBlur={ clearErrormessage }
                onWillFocus={ clearErrormessage }
            />

            <AuthForm
                headerText="Sign In to your Tracker"
                errorMessage={ state.errorMessage }
                submitButtonText="Sign In"
                onSubmit={ ({ email, password }) => signIn({ email, password }) }
            />

            <NavLink
                routeName="SignUp"
                text="Don't have an account? Sing up instead."
            />

        </View >
    );
};

SignInScreen.navigationOptions = () => {
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

export default SignInScreen;