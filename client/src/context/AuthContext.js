import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';


const authReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ERROR':
            return { ...state, errorMessage: action.payload };
        case 'SIGN_UP':
            return { errorMessage: '', token: action.payload };
        case 'SIGN_IN':
            return { errorMessage: '', token: action.payload };
        case 'CLEAR_ERROR_MESSAGE':
            return { ...state, errorMessage: '' };
        case 'SIGN_OUT':
            return { token: null, errorMessage: '' };
        default:
            return state;
    }
};


const signUp = (dispatch) => {

    return async ({ email, password }) => {

        try {
            const response = await trackerApi.post('/signup', {
                email: email, password: password
            });

            await AsyncStorage.setItem('token', response.data.token);

            dispatch({ type: 'SIGN_UP', payload: response.data.token });

            navigate('TrackList');

        } catch (err) {
            dispatch({
                type: 'ADD_ERROR',
                payload: 'Something went wrong with sign up'
            });
        }
    };
};

const signIn = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signin', {
                email: email, password: password
            });

            await AsyncStorage.setItem('token', response.data.token);

            dispatch({ type: 'SIGN_IN', payload: response.data.token });

            navigate('TrackList');

        } catch (err) {
            dispatch({
                type: 'ADD_ERROR',
                payload: 'Something went wrong with sign in'
            });
        }
    };
};

const tryLocalSignIn = dispatch => async () => {

    const token = await AsyncStorage.getItem('token');

    if (token) {
        dispatch({ type: 'SIGN_IN', payload: token });

        navigate('TrackList');
    } else {
        navigate('SignUp');
    }
};

const signOut = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'SIGN_OUT' });

        navigate('SignIn');
    };
};

const clearErrormessage = (dispatch) => () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' });
};


export const { Context, Provider } = createDataContext(
    authReducer,
    {
        signUp: signUp,
        signIn: signIn,
        signOut: signOut,
        clearErrormessage: clearErrormessage,
        tryLocalSignIn: tryLocalSignIn
    },
    {
        errorMessage: '',
        token: null
    }
);