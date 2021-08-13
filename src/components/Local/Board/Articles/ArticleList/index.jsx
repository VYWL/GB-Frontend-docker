import BoardArticleComponent from './BoardArticleComponent';

// Dummy
// 지금은 그냥 예시용으로, 1개의 더미 사용
import b1_articleList from '@Dummy/articles_b1.json';

const ArticleList = props => {
    const { bid } = props;

    const boardArticleList = b1_articleList['data'].map(elem => <BoardArticleComponent {...elem} />);

    return <>{boardArticleList}</>;
};

export default ArticleList;
