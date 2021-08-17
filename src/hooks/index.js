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

export const uploadFiles = async (url, postData) => {
    // { fileName, fileSize, file, isDel, isNew, fID }

    for (let index = 0; index < postData.length; ++index) {
        const { filename, filesize, file, isdel, isnew, fid, articleid } = postData[index];

        const formData = new FormData();
        formData.append('filename', filename);
        formData.append('filesize', filesize);
        formData.append('file', file);
        formData.append('fid', fid);
        formData.append('isdel', isdel);
        formData.append('isnew', isnew);
        formData.append('articleid', articleid);
        formData.append('enctype', 'multipart/form-data');

        const method = isnew ? 'post' : 'put';

        axios({
            method: method,
            url: url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(res => {
            // console.log(res);
        });
    }
};
