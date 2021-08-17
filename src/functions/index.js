import moment from 'moment';

export function getFormattedTime(currentTime = '') {
    if (currentTime === '') return '시간정보 없음';

    const currentKST = moment(currentTime).format();
    const targetTime = moment(new Date()).format();
    const timeDiff = moment(targetTime).diff(moment(currentKST), 'seconds');
    // console.log({ targetTime, currentTime: moment(currentKST).format(), timeDiff });

    if (timeDiff < 0) return 'Invalid date';

    let msg = '';
    if (timeDiff < 60) msg = '방금 전';
    else if (timeDiff < 3600) msg = `${parseInt(timeDiff / 60)}분 전`;
    else if (timeDiff < 86400) msg = `${parseInt(timeDiff / 3600)}시간 전`;
    else if (timeDiff < 86400 * 2) msg = `하루 전`;
    else if (timeDiff < 86400 * 3) msg = `2일 전`;
    else msg = moment(currentKST).format('MM/DD HH:mm');

    return msg;
}

export const arrangeComments = tempList => {
    const returnList = [];

    let childFlag = false;
    let grp = {
        parentComment: '',
        childComment: [],
    };
    for (let i = 0; i < tempList.length; ++i) {
        const nowItem = tempList[i];

        if (nowItem.isReply) {
            grp.childComment.push(nowItem);
            continue;
        }

        if (childFlag) {
            returnList.push({
                parentComment: grp.parentComment,
                childComment: grp.childComment.map(elem => elem),
            });
            grp.parentComment = '';
            grp.childComment = [];
        }

        grp.parentComment = nowItem;
        childFlag = true;
    }

    if (tempList.length) {
        returnList.push({
            parentComment: grp.parentComment,
            childComment: grp.childComment.map(elem => elem),
        });
    }

    return returnList;
};

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const BACK_URL = 'http://localhost:8000';
export const ARTICLE_ENDPOINT = `${BACK_URL}/api/article`;
export const BOARD_ENDPOINT = `${BACK_URL}/api/board`;
export const COMMENT_ENDPOINT = `${BACK_URL}/api/comment`;
export const UPLOAD_ENDPOINT = `${BACK_URL}/api/upload`;
export const MEDIA_ENDPOINT = `${BACK_URL}/media/upload`;
