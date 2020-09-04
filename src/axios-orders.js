import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-8fa6e.firebaseio.com/'
});

export default instance;