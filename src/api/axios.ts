import ax from 'axios';

const baseURL = import.meta.env.VITE_AXIOS_URL;

const axios = ax.create({ baseURL });

export default axios