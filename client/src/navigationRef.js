import { NavigationActions } from 'react-navigation';


let navigator;

export const setNavigator = (nav) => {
    navigator = nav;
};

// @desc should be used for navigation outside of App component
export const navigate = (routeName, params) => {

    navigator.dispatch(
        NavigationActions.navigate({
            routeName: routeName,
            params: params
        })
    );
};