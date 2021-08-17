import useSWR from 'swr';
import BoardArticleComponent from './BoardArticleComponent';

import { getFormattedTime, ARTICLE_ENDPOINT } from '@Functions/';

const ArticleList = props => {
    const { bid } = props;

    // TODO :: backend 보드별 엔드포인트 만들어야함.
    const { data: articleList } = useSWR(`${ARTICLE_ENDPOINT}`);

    const handleArticleList = () => {
        if (!articleList) return [];

        const returnList = articleList.map(data => {
            return {
                articleid: data.articleid,
                title: data.title,
                content: data.content,
                timestamp: getFormattedTime(data.timestamp),
                vote: data.vote,
                unlike: data.unlike,
                comment: data.commentcount,
                writer: data.isanony ? '익명' : data.writer,
                boardid: data.boardid,
                fileCount: data.filecount,
                imageCount: data.imagecount,
                thumbnail: data.thumbnail,
            };
        });

        return returnList;
    };

    const boardArticleList = handleArticleList().map(elem => <BoardArticleComponent {...elem} />);

    return <>{boardArticleList}</>;
};

export default ArticleList;
