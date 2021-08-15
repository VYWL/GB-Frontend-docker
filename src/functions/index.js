import moment from 'moment';

export function getFormattedTime(currentTime = '') {
    if (currentTime === '') return '시간정보 없음';

    const currentKST = moment(currentTime).add(-9, 'h').format();
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

const BACK_URL = 'http://localhost:8000';

export const ARTICLE_ENDPOINT = `${BACK_URL}/api/article`;
export const BOARD_ENDPOINT = `${BACK_URL}/api/board`;
export const COMMENT_ENDPOINT = `${BACK_URL}/api/comment`;
