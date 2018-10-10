import axios from 'axios';

const instance = axios.create(
    {
        baseURL:'https://myburger-3881f.firebaseio.com/',
    }
);

export default instance;
