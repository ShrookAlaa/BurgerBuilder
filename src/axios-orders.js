import axios from 'axios';

const instance = axios.create({
    //baseURL: 'https://burger-builder-8fa6e.firebaseio.com/' //1
    baseURL: 'https://burger-builder-b5fa8.firebaseio.com/'
});

export default instance;