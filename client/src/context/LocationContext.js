import createDataContext from './createDataContext';


const locationReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CURRENT_LOCATION':
            return { ...state, currentLocation: action.payload };
        case 'ADD_LOCATION':
            return { ...state, locations: [...state.locations, action.payload] };
        case 'START_RECORDING':
            return { ...state, recording: true };
        case 'STOP_RECORDING':
            return { ...state, recording: false };
        case 'CHANGE_NAME':
            return { ...state, name: action.payload };
        case 'RESET':
            return { ...state, name: '', locations: [] };
        default:
            return state;
    }
};

const startRecording = (dispatch) => {
    return () => {

        dispatch({ type: 'START_RECORDING' });
    };
};

const stopRecording = (dispatch) => {
    return () => {

        dispatch({ type: 'STOP_RECORDING' });
    };
};

const addLocation = (dispatch) => {
    return (location, recording) => {
        dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location });
        if (recording) {
            dispatch({ type: 'ADD_LOCATION', payload: location });
        }
    };
};

const changeName = (dispatch) => {
    return (name) => {
        dispatch({ type: 'CHANGE_NAME', payload: name });
    };
};

const reset = dispatch => () => {
    dispatch({ type: 'RESET' });
};

export const { Context, Provider } = createDataContext(
    locationReducer,
    {
        startRecording: startRecording,
        stopRecording: stopRecording,
        addLocation: addLocation,
        changeName: changeName,
        reset: reset
    },
    {
        name: '',
        recording: false,
        locations: [],
        currentLocation: null
    }
);