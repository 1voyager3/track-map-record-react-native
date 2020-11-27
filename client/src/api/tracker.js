import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const instance = axios.create({
    // @desc make sure to update it in each 8 hours
    baseURL: 'http://d360fa994a92.ngrok.io'
});

instance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${ token }`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;