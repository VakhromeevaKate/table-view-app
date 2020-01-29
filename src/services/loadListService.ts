import axios from 'axios';
import { apiPrefix, parseConfig } from '../etc/config.json';

export const getList = async() => {
    const data = await axios.get(`${apiPrefix}/list`);
    return data.data.split(parseConfig.delimiter);
}