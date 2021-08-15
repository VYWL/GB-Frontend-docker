import axios from 'axios';

const genConfig = (method = '', url, data) => {
    if (method === '') return {};

    const returnObj = {
        method,
        url,
    };

    if (data !== {}) returnObj['data'] = data;

    return returnObj;
};

export async function fetchData(method = '', url = '', data = {}) {
    if (method === '' || url === '') return {};

    const config = genConfig(method, url, data);
    const response = await axios(config);

    return response.data;
}
